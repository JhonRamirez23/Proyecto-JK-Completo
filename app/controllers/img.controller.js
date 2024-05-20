//Se importa multer para guardar archivos en el directorio 'uploads'.
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

//Importamos el directorio de imágenes
import crearDirectorioImagenes from '../helpers/fs.js';

//Llama a la función para crear el directorio "uploads" si no existe.
crearDirectorioImagenes();

//Configuración de multer para guardar archivos en el directorio 'uploads'.
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path.join(__dirname, '../uploads');
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        const extArchivo = file.originalname.split('.').pop(); //Toma la extensión del archivo que fue cargado
        cb(null, `${Date.now()}.${extArchivo}`); //Pone el nombre al archivo con la extensión que tiene.
    }
});

const fileFilter = (req, file, cb) => {
    const extArchivo = path.extname(file.originalname).toLowerCase();
    if (extArchivo === '.jpg') {
        cb(null, true);
    } else {
        cb(new Error('Solo se permiten archivos .jpg'), false);
    }
};

export const upload = multer({ 
    storage: storage,
    fileFilter: fileFilter
});
