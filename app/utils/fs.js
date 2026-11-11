import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

//Se crea el directorio de imágenes en el servidor
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const crearDirectorioImagenes = () => {
    const uploadImage = path.join(__dirname, '../uploads');

    //Verifica si el directorio ya existe
    if (!fs.existsSync(uploadImage)) {

    //Si no existe, lo crea.
    fs.mkdirSync(uploadImage);
    console.log(`Directorio de imágenes creado en ${uploadImage}`);
    } else {
        console.log(`Directorio de imágenes en ${uploadImage} ya existe.`)
    };
};

export default crearDirectorioImagenes;