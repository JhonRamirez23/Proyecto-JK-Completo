// Repositorio de pedidos — encapsula consultas a la tabla `pedidos_compras`.
// Capa: repositories. No construye respuestas HTTP, no contiene reglas de negocio.

import getConnection from '../config/database.js';

// Lista todos los pedidos ordenados por id.
async function findAll() {
    const conn = getConnection();
    const { rows } = await conn.query('SELECT id_orden_pedido, id_usuario, id_producto, id_compra, fecha_creacion FROM pedidos_compras ORDER BY id_orden_pedido');
    return rows;
}

// Busca un pedido por su ID.
async function findById(id) {
    const conn = getConnection();
    const { rows } = await conn.query('SELECT id_orden_pedido, id_usuario, id_producto, id_compra, fecha_creacion FROM pedidos_compras WHERE id_compra = $1', [id]);
    return rows[0] || null;
}

// Busca pedidos por usuario.
async function findByUser(id) {
    const conn = getConnection();
    const { rows } = await conn.query('SELECT id_orden_pedido, id_usuario, id_producto, id_compra, fecha_creacion FROM pedidos_compras WHERE id_usuario = $1', [id]);
    return rows;
}

// Busca pedidos por producto.
async function findByProduct(id) {
    const conn = getConnection();
    const { rows } = await conn.query('SELECT id_orden_pedido, id_usuario, id_producto, id_compra, fecha_creacion FROM pedidos_compras WHERE id_producto = $1', [id]);
    return rows;
}

// Busca pedidos por orden de compra.
async function findByOrder(id) {
    const conn = getConnection();
    const { rows } = await conn.query('SELECT id_orden_pedido, id_usuario, id_producto, id_compra, fecha_creacion FROM pedidos_compras WHERE id_orden_compra = $1', [id]);
    return rows;
}

// Inserta un nuevo pedido.
async function create(purchaseData) {
    const conn = getConnection();
    const keys = Object.keys(purchaseData);
    const values = Object.values(purchaseData);
    const placeholders = keys.map((_, i) => `$${i + 1}`).join(', ');
    const columns = keys.join(', ');
    const { rows } = await conn.query(`INSERT INTO pedidos_compras (${columns}) VALUES (${placeholders}) RETURNING *`, values);
    return rows[0] || null;
}

// Actualiza un pedido existente por su ID.
async function update(id, purchaseData) {
    const conn = getConnection();
    const keys = Object.keys(purchaseData);
    const values = Object.values(purchaseData);
    const setClause = keys.map((key, i) => `${key} = $${i + 1}`).join(', ');
    const valuesWithId = [...values, id];
    const { rows } = await conn.query(
        `UPDATE pedidos_compras SET ${setClause} WHERE id_compra = $${valuesWithId.length} RETURNING *`,
        valuesWithId
    );
    return rows[0] || null;
}

// Elimina un pedido por su ID.
async function remove(id) {
    const conn = getConnection();
    const { rowCount } = await conn.query('DELETE FROM pedidos_compras WHERE id_compra = $1', [id]);
    return rowCount;
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