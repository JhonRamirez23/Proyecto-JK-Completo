// Repositorio de productos — encapsula consultas a la tabla `productos`.
// Capa: repositories. No construye respuestas HTTP, no contiene reglas de negocio.

import getConnection from '../config/database.js';

// Lista todos los productos ordenados por id.
async function findAll() {
    const conn = getConnection();
    const { rows } = await conn.query('SELECT * FROM productos ORDER BY id_producto');
    return rows;
}

// Busca un producto por su ID.
async function findById(id) {
    const conn = getConnection();
    const { rows } = await conn.query('SELECT * FROM productos WHERE id_producto = $1', [id]);
    return rows[0] || null;
}

// Busca productos por nombre (búsqueda parcial, case-insensitive).
async function findByArticulo(articulo) {
    const conn = getConnection();
    const { rows } = await conn.query('SELECT * FROM productos WHERE articulo ILIKE $1', [`%${articulo}%`]);
    return rows;
}

// Inserta un nuevo producto.
// Los campos obligatorios: articulo, valor, cantidad.
async function create(productData) {
    const conn = getConnection();
    const keys = Object.keys(productData);
    const values = Object.values(productData);
    const placeholders = keys.map((_, i) => `$${i + 1}`).join(', ');
    const columns = keys.join(', ');
    const { rows } = await conn.query(`INSERT INTO productos (${columns}) VALUES (${placeholders}) RETURNING *`, values);
    return rows[0] || null;
}

// Actualiza un producto existente por su ID.
async function update(id, productData) {
    const conn = getConnection();
    const keys = Object.keys(productData);
    const values = Object.values(productData);
    const setClause = keys.map((key, i) => `${key} = $${i + 1}`).join(', ');
    const valuesWithId = [...values, id];
    const { rows } = await conn.query(
        `UPDATE productos SET ${setClause} WHERE id_producto = $${valuesWithId.length} RETURNING *`,
        valuesWithId
    );
    return rows[0] || null;
}

// Elimina un producto por su ID.
async function remove(id) {
    const conn = getConnection();
    const { rowCount } = await conn.query('DELETE FROM productos WHERE id_producto = $1', [id]);
    return rowCount;
}

export default {
    findAll,
    findById,
    findByArticulo,
    create,
    update,
    remove
};