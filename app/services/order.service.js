// Servicio de órdenes de compra — coordina operaciones de órdenes.
// Capa: services. Contiene reglas de negocio y validaciones.
// No depende de Express ni de objetos req/res.

import orderRepo from '../repositories/order.repository.js';

// Lista todas las órdenes de compra.
async function findAll() {
    return await orderRepo.findAll();
}

// Busca una orden de compra por ID.
async function findById(id) {
    if (!id || isNaN(id)) {
        throw new Error('ID de orden inválido');
    }
    return await orderRepo.findById(id);
}

// Crea una nueva orden de compra.
async function create(orderData) {
    const { fecha_creacion } = orderData;

    if (!fecha_creacion) {
        throw new Error('La fecha de creación es obligatoria');
    }

    const nuevaOrden = {
        fecha_creacion: fecha_creacion
    };

    return await orderRepo.create(nuevaOrden);
}

// Actualiza una orden de compra existente.
async function update(id, orderData) {
    if (!id || isNaN(id)) {
        throw new Error('ID de orden inválido');
    }

    const updates = {};
    if (orderData.fecha_creacion !== undefined) {
        updates.fecha_creacion = orderData.fecha_creacion;
    }

    if (Object.keys(updates).length === 0) {
        throw new Error('No hay campos para actualizar');
    }

    return await orderRepo.update(id, updates);
}

// Elimina una orden de compra.
async function remove(id) {
    if (!id || isNaN(id)) {
        throw new Error('ID de orden inválido');
    }
    return await orderRepo.remove(id);
}

export default {
    findAll,
    findById,
    create,
    update,
    remove
};
