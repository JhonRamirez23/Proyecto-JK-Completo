// Repositorio de vendedores — encapsula consultas a la tabla `vendedores`.
// Capa: repositories. No construye respuestas HTTP, no contiene reglas de negocio.

import getConnection from '../config/database.js';

// Lista todos los vendedores ordenados por id.
async function findAll() {
    const conn = getConnection();
    const { rows } = await conn.query('SELECT * FROM vendedores ORDER BY idinteger');
    return rows;
}

// Busca un vendedor por su ID.
async function findById(id) {
    const conn = getConnection();
    const { rows } = await conn.query('SELECT * FROM vendedores WHERE idinteger = $1', [id]);
    return rows[0] || null;
}

// Busca vendedores por usuario.
async function findByUser(id) {
    const conn = getConnection();
    const { rows } = await conn.query('SELECT * FROM vendedores WHERE idinteger = $1', [id]);
    return rows;
}

// Inserta un nuevo vendedor.
async function create(sellerData) {
    const conn = getConnection();
    const keys = Object.keys(sellerData);
    const values = Object.values(sellerData);
    const placeholders = keys.map((_, i) => `$${i + 1}`).join(', ');
    const columns = keys.join(', ');
    const { rows } = await conn.query(`INSERT INTO vendedores (${columns}) VALUES (${placeholders}) RETURNING *`, values);
    return rows[0] || null;
}

// Actualiza un vendedor existente por su ID.
async function update(id, sellerData) {
    const conn = getConnection();
    const keys = Object.keys(sellerData);
    const values = Object.values(sellerData);
    const setClause = keys.map((key, i) => `${key} = $${i + 1}`).join(', ');
    const valuesWithId = [...values, id];
    const { rows } = await conn.query(
        `UPDATE vendedores SET ${setClause} WHERE idinteger = $${valuesWithId.length} RETURNING *`,
        valuesWithId
    );
    return rows[0] || null;
}

// Elimina un vendedor por su ID.
async function remove(id) {
    const conn = getConnection();
    const { rowCount } = await conn.query('DELETE FROM vendedores WHERE idinteger = $1', [id]);
    return rowCount;
}

export default {
    findAll,
    findById,
    findByUser,
    create,
    update,
    remove
};