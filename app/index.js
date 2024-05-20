//Uso de import según las reglas de ES6
import express from 'express';
const app = express();

//Guarda las sesiones en memoria
import NodeCache from 'node-cache';
const imgCache = new NodeCache();

//Manejo de CORS
import cors from 'cors';

//Manejo de archivos
import fs from 'fs';

//Importa la función que crea el directorio de imágenes
import helperImage from './helpers/fs.js';

//Importamos el módulo storage de multer
import { upload } from './controllers/img.controller.js';

//Importamos el cookie-parser para leer los datos de las cookies
import cookieParser from 'cookie-parser';

//Fix para __dirname
import path from 'path';
import { fileURLToPath } from 'url';

//Se importan los métodos que vienen de auth.controllers.js
import { methods as authentication } from './controllers/auth.controller.js';
import { isAuthenticated as auth } from './middlewares/authorization.js';

//El __dirname es para cuando se especifica en el archivo package.json el "type": "module"
//path.dirname se usa para crear carpetas estáticas dentro del proyecto
const __dirname = path.dirname(fileURLToPath(import.meta.url));

//Se configura el servidor
app.set('port', 4000);
app.listen(app.get('port'));
console.log("Servidor escuchando en puerto", app.get('port'));

// Configura el servidor para servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'uploads'))); // Asegúrate de servir el directorio 'uploads'
app.use(cookieParser());
app.use(cors());

//Rutas de la API.
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//Rutas públicas
app.get('/inicio', (req, res) => { res.sendFile(__dirname + '/pages/index.html'); })
app.get('/login', (req, res) => { res.sendFile(__dirname + '/pages/login.html'); })
app.get('/register', (req, res) => { res.sendFile(__dirname + '/pages/register.html'); })

//Rutas del módulo Gerencias
app.get('/admin', auth, (req, res) => { res.sendFile(__dirname + '/pages/admin/admin.html'); })
app.get('/update-images', auth, (req, res) => { res.sendFile(__dirname + '/pages/admin/images.html'); })
app.get('/add', auth, (req, res) => { res.sendFile(__dirname + '/pages/admin/add.html'); })
app.get('/erase', auth, (req, res) => { res.sendFile(__dirname + '/pages/admin/erase.html'); })
app.get('/updates', auth, (req, res) => { res.sendFile(__dirname + '/pages/admin/update.html'); })
app.get('/sales', auth, (req, res) => { res.sendFile(__dirname + '/pages/admin/sales.html'); })

//Rutas del módulo Vendedor
app.get('/sales-employes', auth, (req, res) => { res.sendFile(__dirname + '/pages/employes/employes.html'); })
app.get('/products', auth, (req, res) => { res.sendFile(__dirname + '/pages/employes/products.html'); })

//Rutas del módulo Clientes
app.get('/clients', auth, (req, res) => { res.sendFile(__dirname + '/pages/sales/clients.html'); })

//Rutas del módulo Inventario
app.get('/inventory', auth, (req, res) => { res.sendFile(__dirname + '/pages/inventory/inventory.html'); })

//Ruta de la API
app.post('/api/login', authentication.login);
app.post('/api/register', authentication.register);

//Post para manejar la carga de imágenes
app.post('/update-images', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).send({ status: "Error", message: "No se ha cargado ninguna imagen" });
    }
    res.send(`Archivo ${req.file.filename} cargado exitosamente.`);
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
        res.status(400).send({ status: "Error", message: "Formato de imagen no válido" });
    }
});

// Ruta para servir las imágenes
app.get('/uploads/:imageName', (req, res) => {
    const imageName = req.params.imageName;
    const imagePath = path.join(__dirname, 'uploads', imageName);

    // Intentar obtener la imagen de la caché
    const cachedImage = imageCache.get(imageName);
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
            imageCache.set(imageName, data, 3600);

            // Enviar la imagen al cliente
            res.set('Content-Type', 'image/jpeg'); // Ajusta el tipo MIME según el tipo de imagen
            res.send(data);
        });
    }
});