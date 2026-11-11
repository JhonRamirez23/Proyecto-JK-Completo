// Repositorio de empleados — encapsula consultas a la tabla `empleados`.
// Capa: repositories. No construye respuestas HTTP, no contiene reglas de negocio.

import getConnection from '../config/database.js';

// Lista todos los empleados ordenados por id.
async function findAll() {
    const conn = getConnection();
    const { rows } = await conn.query('SELECT * FROM empleados ORDER BY idinteger');
    return rows;
}

// Busca un empleado por su ID.
async function findById(id) {
    const conn = getConnection();
    const { rows } = await conn.query('SELECT * FROM empleados WHERE idinteger = $1', [id]);
    return rows[0] || null;
}

// Busca empleados por usuario.
async function findByUser(id) {
    const conn = getConnection();
    const { rows } = await conn.query('SELECT * FROM empleados WHERE idinteger = $1', [id]);
    return rows;
}

// Inserta un nuevo empleado.
async function create(employeeData) {
    const conn = getConnection();
    const keys = Object.keys(employeeData);
    const values = Object.values(employeeData);
    const placeholders = keys.map((_, i) => `$${i + 1}`).join(', ');
    const columns = keys.join(', ');
    const { rows } = await conn.query(`INSERT INTO empleados (${columns}) VALUES (${placeholders}) RETURNING *`, values);
    return rows[0] || null;
}

// Actualiza un empleado existente por su ID.
async function update(id, employeeData) {
    const conn = getConnection();
    const keys = Object.keys(employeeData);
    const values = Object.values(employeeData);
    const setClause = keys.map((key, i) => `${key} = $${i + 1}`).join(', ');
    const valuesWithId = [...values, id];
    const { rows } = await conn.query(
        `UPDATE empleados SET ${setClause} WHERE idinteger = $${valuesWithId.length} RETURNING *`,
        valuesWithId
    );
    return rows[0] || null;
}

// Elimina un empleado por su ID.
async function remove(id) {
    const conn = getConnection();
    const { rowCount } = await conn.query('DELETE FROM empleados WHERE idinteger = $1', [id]);
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