// Servicio de pedidos — coordina operaciones de pedidos de compra.
// Capa: services. Contiene reglas de negocio y validaciones.
// No depende de Express ni de objetos req/res.

import purchaseRepo from '../repositories/purchase.repository.js';

// Lista todos los pedidos.
async function findAll() {
    return await purchaseRepo.findAll();
}

// Busca un pedido por ID.
async function findById(id) {
    if (!id || isNaN(id)) {
        throw new Error('ID de pedido inválido');
    }
    return await purchaseRepo.findById(id);
}

// Busca pedidos por usuario.
async function findByUser(id) {
    if (!id || isNaN(id)) {
        throw new Error('ID de usuario inválido');
    }
    return await purchaseRepo.findByUser(id);
}

// Busca pedidos por producto.
async function findByProduct(id) {
    if (!id || isNaN(id)) {
        throw new Error('ID de producto inválido');
    }
    return await purchaseRepo.findByProduct(id);
}

// Busca pedidos por orden de compra.
async function findByOrder(id) {
    if (!id || isNaN(id)) {
        throw new Error('ID de orden de compra inválido');
    }
    return await purchaseRepo.findByOrder(id);
}

// Crea un nuevo pedido.
// Campos obligatorios: id_usuario, id_producto, id_compra.
async function create(purchaseData) {
    const { id_usuario, id_producto, id_compra } = purchaseData;

    if (!id_usuario || isNaN(id_usuario)) {
        throw new Error('El ID de persona es obligatorio');
    }
    if (!id_producto || isNaN(id_producto)) {
        throw new Error('El ID de producto es obligatorio');
    }
    if (!id_compra || isNaN(id_compra)) {
        throw new Error('El ID de orden de compra es obligatorio');
    }

    const nuevoPedido = {
        id_usuario: parseInt(id_usuario, 10),
        id_producto: parseInt(id_producto, 10),
        id_compra: parseInt(id_compra, 10)
    };

    return await purchaseRepo.create(nuevoPedido);
}

// Actualiza un pedido existente.
async function update(id, purchaseData) {
    if (!id || isNaN(id)) {
        throw new Error('ID de pedido inválido');
    }

    const updates = {};
    if (purchaseData.id_usuario !== undefined) {
        if (isNaN(purchaseData.id_usuario)) {
            throw new Error('ID de persona inválido');
        }
        updates.id_usuario = parseInt(purchaseData.id_usuario, 10);
    }
    if (purchaseData.id_producto !== undefined) {
        if (isNaN(purchaseData.id_producto)) {
            throw new Error('ID de producto inválido');
        }
        updates.id_producto = parseInt(purchaseData.id_producto, 10);
    }
    if (purchaseData.id_compra !== undefined) {
        if (isNaN(purchaseData.id_compra)) {
            throw new Error('ID de orden de compra inválido');
        }
        updates.id_compra = parseInt(purchaseData.id_compra, 10);
    }

    if (Object.keys(updates).length === 0) {
        throw new Error('No hay campos para actualizar');
    }

    return await purchaseRepo.update(id, updates);
}

// Elimina un pedido.
async function remove(id) {
    if (!id || isNaN(id)) {
        throw new Error('ID de pedido inválido');
    }
    return await purchaseRepo.remove(id);
}

export default {
    findAll,
    findById,
    findByUser,
    findByProduct,
    findByOrder,
    create,
    update,
    remove
};
