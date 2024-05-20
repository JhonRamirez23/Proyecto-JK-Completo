import sharp from 'sharp';

/**
 * Comprime una imagen utilizando Sharp.
 * @param {string} imagePath - Ruta de la imagen a comprimir.
 * @param {string} outputPath - Ruta donde se guardará la imagen comprimida.
 * @param {number} maxWidth - Ancho máximo deseado para la imagen (opcional).
 * @param {number} quality - Calidad de compresión de la imagen (0 - 100, opcional).
 * @returns {Promise<void>} Una promesa que se resuelve cuando la imagen ha sido comprimida.
 */
export async function compressImage(imagePath, outputPath, maxWidth = 800, quality = 70) {
    try {
        await sharp(imagePath)
            .resize({ width: maxWidth })
            .jpeg({ quality })
            .toFile(outputPath);
    } catch (error) {
        console.error('Error al comprimir la imagen:', error);
        throw error;
    }
}
