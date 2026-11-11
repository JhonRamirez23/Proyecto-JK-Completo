// Servicio de vendedores — coordina operaciones de vendedores.
// Capa: services. Contiene reglas de negocio y validaciones.
// No depende de Express ni de objetos req/res.

import sellerRepo from '../repositories/seller.repository.js';

// Lista todos los vendedores.
async function findAll() {
    return await sellerRepo.findAll();
}

// Busca un vendedor por ID.
async function findById(id) {
    if (!id || isNaN(id)) {
        throw new Error('ID de vendedor inválido');
    }
    return await sellerRepo.findById(id);
}

// Busca vendedores por usuario.
async function findByUser(id) {
    if (!id || isNaN(id)) {
        throw new Error('ID de usuario inválido');
    }
    return await sellerRepo.findByUser(id);
}

// Crea un nuevo vendedor.
// Campos obligatorios: id_vendedor, nombre, direccion, telefono.
async function create(sellerData) {
    const { id_vendedor, nombre, direccion, telefono } = sellerData;

    if (!id_vendedor || isNaN(id_vendedor)) {
        throw new Error('El ID del vendedor es obligatorio');
    }
    if (!nombre || nombre.trim() === '') {
        throw new Error('El nombre del vendedor es obligatorio');
    }
    if (!direccion || direccion.trim() === '') {
        throw new Error('La dirección del vendedor es obligatoria');
    }
    if (!telefono || telefono.trim() === '') {
        throw new Error('El teléfono del vendedor es obligatorio');
    }

    const nuevoVendedor = {
        id_vendedor: parseInt(id_vendedor, 10),
        nombre: nombre.trim(),
        direccion: direccion.trim(),
        telefono: telefono.trim()
    };

    return await sellerRepo.create(nuevoVendedor);
}

// Actualiza un vendedor existente.
async function update(id, sellerData) {
    if (!id || isNaN(id)) {
        throw new Error('ID de vendedor inválido');
    }

    const updates = {};
    if (sellerData.id_vendedor !== undefined) {
        if (isNaN(sellerData.id_vendedor)) {
            throw new Error('ID de vendedor inválido');
        }
        updates.id_vendedor = parseInt(sellerData.id_vendedor, 10);
    }
    if (sellerData.nombre !== undefined) {
        if (sellerData.nombre.trim() === '') {
            throw new Error('El nombre del vendedor no puede estar vacío');
        }
        updates.nombre = sellerData.nombre.trim();
    }
    if (sellerData.direccion !== undefined) {
        if (sellerData.direccion.trim() === '') {
            throw new Error('La dirección del vendedor no puede estar vacía');
        }
        updates.direccion = sellerData.direccion.trim();
    }
    if (sellerData.telefono !== undefined) {
        if (sellerData.telefono.trim() === '') {
            throw new Error('El teléfono del vendedor no puede estar vacío');
        }
        updates.telefono = sellerData.telefono.trim();
    }

    if (Object.keys(updates).length === 0) {
        throw new Error('No hay campos para actualizar');
    }

    return await sellerRepo.update(id, updates);
}

// Elimina un vendedor.
async function remove(id) {
    if (!id || isNaN(id)) {
        throw new Error('ID de vendedor inválido');
    }
    return await sellerRepo.remove(id);
}

export default {
    findAll,
    findById,
    findByUser,
    create,
    update,
    remove
};
