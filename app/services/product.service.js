// Servicio de productos — coordina operaciones del catálogo de productos.
// Capa: services. Contiene reglas de negocio y validaciones.
// No depende de Express ni de objetos req/res.

import productRepo from '../repositories/product.repository.js';

// Lista todos los productos.
async function findAll() {
    return await productRepo.findAll();
}

// Busca un producto por ID.
async function findById(id) {
    if (!id || isNaN(id)) {
        throw new Error('ID de producto inválido');
    }
    return await productRepo.findById(id);
}

// Busca productos por nombre (búsqueda parcial).
async function findByArticulo(articulo) {
    if (!articulo || articulo.trim() === '') {
        throw new Error('El término de búsqueda es obligatorio');
    }
    return await productRepo.findByArticulo(articulo.trim());
}

// Crea un nuevo producto.
// Campos obligatorios: articulo, valor, cantidad.
async function create(productData) {
    const { articulo, valor, cantidad } = productData;

    if (!articulo || articulo.trim() === '') {
        throw new Error('El nombre del producto es obligatorio');
    }
    if (valor === undefined || valor === null || isNaN(valor)) {
        throw new Error('El valor del producto es obligatorio');
    }
    if (cantidad === undefined || cantidad === null || isNaN(cantidad) || cantidad < 0) {
        throw new Error('La cantidad del producto es obligatoria y debe ser mayor o igual a cero');
    }

    const nuevoProducto = {
        articulo: articulo.trim(),
        valor: parseInt(valor, 10),
        cantidad: parseInt(cantidad, 10)
    };

    return await productRepo.create(nuevoProducto);
}

// Actualiza un producto existente.
async function update(id, productData) {
    if (!id || isNaN(id)) {
        throw new Error('ID de producto inválido');
    }

    const updates = {};
    if (productData.articulo !== undefined) {
        if (productData.articulo.trim() === '') {
            throw new Error('El nombre del producto no puede estar vacío');
        }
        updates.articulo = productData.articulo.trim();
    }
    if (productData.valor !== undefined) {
        if (isNaN(productData.valor)) {
            throw new Error('El valor del producto es inválido');
        }
        updates.valor = parseInt(productData.valor, 10);
    }
    if (productData.cantidad !== undefined) {
        if (isNaN(productData.cantidad) || productData.cantidad < 0) {
            throw new Error('La cantidad del producto es inválida');
        }
        updates.cantidad = parseInt(productData.cantidad, 10);
    }

    if (Object.keys(updates).length === 0) {
        throw new Error('No hay campos para actualizar');
    }

    return await productRepo.update(id, updates);
}

// Elimina un producto.
async function remove(id) {
    if (!id || isNaN(id)) {
        throw new Error('ID de producto inválido');
    }
    return await productRepo.remove(id);
}

export default {
    findAll,
    findById,
    findByArticulo,
    create,
    update,
    remove
};
