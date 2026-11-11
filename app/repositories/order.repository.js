// Repositorio de órdenes de compra — encapsula consultas a la tabla `ordenes_compra`.
// Capa: repositories. No construye respuestas HTTP, no contiene reglas de negocio.

import getConnection from '../config/database.js';

// Lista todas las órdenes de compra ordenadas por id.
async function findAll() {
    const conn = getConnection();
    const { rows } = await conn.query('SELECT id_compra, fecha_creacion FROM ordenes_compra ORDER BY id_compra');
    return rows;
}

// Busca una orden de compra por su ID.
async function findById(id) {
    const conn = getConnection();
    const { rows } = await conn.query('SELECT * FROM ordenes_compra WHERE id_compra = $1', [id]);
    return rows[0] || null;
}

// Inserta una nueva orden de compra.
async function create(orderData) {
    const conn = getConnection();
    const keys = Object.keys(orderData);
    const values = Object.values(orderData);
    const placeholders = keys.map((_, i) => `$${i + 1}`).join(', ');
    const columns = keys.join(', ');
    const { rows } = await conn.query(`INSERT INTO ordenes_compra (${columns}) VALUES (${placeholders}) RETURNING *`, values);
    return rows[0] || null;
}

// Actualiza una orden de compra existente por su ID.
async function update(id, orderData) {
    const conn = getConnection();
    const keys = Object.keys(orderData);
    const values = Object.values(orderData);
    const setClause = keys.map((key, i) => `${key} = $${i + 1}`).join(', ');
    const valuesWithId = [...values, id];
    const { rows } = await conn.query(
        `UPDATE ordenes_compra SET ${setClause} WHERE id_compra = $${valuesWithId.length} RETURNING *`,
        valuesWithId
    );
    return rows[0] || null;
}

// Elimina una orden de compra por su ID.
async function remove(id) {
    const conn = getConnection();
    const { rowCount } = await conn.query('DELETE FROM ordenes_compra WHERE id_compra = $1', [id]);
    return rowCount;
}

export default {
    findAll,
    findById,
    create,
    update,
    remove
};