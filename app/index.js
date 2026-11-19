import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
const app = express();

//Guarda las sesiones en memoria
import NodeCache from 'node-cache';
const imgCache = new NodeCache();

//Manejo de CORS
import cors from 'cors';

//Manejo de archivos
import fs from 'fs';

// Crea el almacenamiento local solo al arrancar el servidor de desarrollo.
import crearDirectorioImagenes from './utils/fs.js';

//Importamos el módulo storage de multer
import { upload } from './controllers/img.controller.js';

//Importamos el cookie-parser para leer los datos de las cookies
import cookieParser from 'cookie-parser';

//Fix para __dirname
import path from 'path';
import { fileURLToPath } from 'url';

//Se importan los métodos que vienen de auth.controllers.js
import { isAdmin } from './middlewares/authorization.js';

//Rutas
import authRoutes from './routes/auth.routes.js';

//El __dirname es para cuando se especifica en el archivo package.json el "type": "module"
//path.dirname se usa para crear carpetas estáticas dentro del proyecto
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// El frontend React se sirve desde su propio despliegue; Express conserva solo la API.
app.use(cookieParser());
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

app.use(helmet());
const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100 });
app.use(limiter);
app.use(cors({ origin: process.env.CORS_ORIGIN || 'http://localhost:4000', credentials: true }));

//Rutas de la API.
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Montar rutas de autenticación
app.use(authRoutes);

//Post para manejar la carga de imágenes
app.post('/update-images', isAdmin, upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).send({ status: 'Error', message: 'No se ha cargado ninguna imagen' });
    }
    res.send({ status: 'Success', message: 'Archivo cargado exitosamente.' });
});

//Ruta para obtener las imágenes ya cargadas
app.get('/uploaded-images', (req, res) => {

    //Lee el directorio de uploads y devuelve la lista de nombres de archivo de las imágenes
    fs.readdir(path.join(__dirname, 'uploads'), (err, files) => {
        if (err) {
            return res.status(500).send('Error al obtener las imágenes.');
        }
        res.json(files);
    });
});


//Manejo de errores
app.use((err, req, res, next) => {
    if (err) {
        res.status(400).send({ status: 'Error', message: 'Formato de imagen no válido' });
    }
});

// Ruta para servir las imágenes
app.get('/uploads/:imageName', (req, res) => {
    const imageName = req.params.imageName;
    const imagePath = path.join(__dirname, 'uploads', imageName);

    // Intentar obtener la imagen de la caché
    const cachedImage = imgCache.get(imageName);
    if (cachedImage) {
        // Si la imagen está en caché, enviarla desde la caché
        res.set('Content-Type', 'image/jpeg'); // Ajusta el tipo MIME según el tipo de imagen
        res.send(cachedImage);
    } else {
        // Si la imagen no está en caché, leerla desde el disco
        fs.readFile(imagePath, (err, data) => {
            if (err) {
                console.error('Error al leer la imagen:', err);
                res.status(500).send('Error al leer la imagen');
                return;
            }

            // Almacenar la imagen en caché por 1 hora (3600 segundos)
            imgCache.set(imageName, data, 3600);

            // Enviar la imagen al cliente
            res.set('Content-Type', 'image/jpeg'); // Ajusta el tipo MIME según el tipo de imagen
            res.send(data);
        });
    }
});

export default app;

// Al importar la aplicación (por ejemplo, desde Vercel) no se abre un puerto.
// El listener solo se inicia cuando este archivo es el punto de entrada local.
const entryFile = process.argv[1] ? path.resolve(process.argv[1]) : '';
if (entryFile === fileURLToPath(import.meta.url)) {
    crearDirectorioImagenes();
    const port = Number(process.env.PORT) || 4000;
    app.listen(port, () => {
        console.log('Servidor escuchando en puerto', port);
    });
}
