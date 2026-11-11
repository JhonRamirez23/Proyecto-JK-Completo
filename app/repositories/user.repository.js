// Repositorio de usuarios — encapsula todas las consultas SQL a la tabla `usuarios`.
import getConnection from '../config/database.js';

// Busca un usuario por su documento.
async function findByDocument(documento) {
    const conn = getConnection();
    const { rows } = await conn.query('SELECT * FROM usuarios WHERE documento = $1', [documento]);
    return rows;
}

// Busca un usuario por su email.
async function findByEmail(email) {
    const conn = getConnection();
    const { rows } = await conn.query('SELECT * FROM usuarios WHERE email = $1', [email]);
    return rows;
}

// Busca el cargo asociado al documento de un usuario para autorización.
async function findCargoByDocument(documento) {
    const conn = getConnection();
    const { rows } = await conn.query(
        `SELECT e.cargo
         FROM usuarios u
         JOIN empleados e ON e.id_usuario = u.id
         WHERE u.documento = $1
         LIMIT 1`,
        [documento]
    );
    return rows[0]?.cargo ?? null;
}

// Obtiene los roles asignados desde el catálogo maestro y la relación usuario-rol.
async function findRolesByDocument(documento) {
    const conn = getConnection();
    const { rows } = await conn.query(
        `SELECT DISTINCT LOWER(TRIM(r.rol_cod)) AS rol
         FROM usuarios u
         JOIN usuarios_roles ur ON ur.id_usuario = u.id
         JOIN roles r ON r.id_rol = ur.id_rol
         WHERE u.documento = $1
         ORDER BY rol`,
        [documento]
    );
    return rows.map(({ rol }) => rol);
}

// Inserta un nuevo usuario en la tabla.
async function create(userData) {
    const conn = getConnection();
    const keys = Object.keys(userData);
    const values = Object.values(userData);
    const placeholders = keys.map((_, i) => `$${i + 1}`).join(', ');
    const columns = keys.join(', ');
    const { rows } = await conn.query(`INSERT INTO usuarios (${columns}) VALUES (${placeholders}) RETURNING *`, values);
    return rows;
}

// Crea el usuario y lo vincula al rol público predeterminado en una transacción.
async function createWithDefaultRole(userData) {
    const pool = getConnection();
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        // Serializa registros para evitar duplicados y carreras al crear el rol inicial.
        await client.query('SELECT pg_advisory_xact_lock($1)', [714203]);

        const { rows: existing } = await client.query(
            'SELECT usuario, email FROM usuarios WHERE LOWER(usuario) = LOWER($1) OR LOWER(email) = LOWER($2)',
            [userData.usuario, userData.email]
        );
        if (existing.some((row) => row.usuario.toLowerCase() === userData.usuario.toLowerCase())) {
            throw new Error('El usuario o el correo ya existe');
        }
        if (existing.some((row) => row.email.toLowerCase() === userData.email.toLowerCase())) {
            throw new Error('El usuario o el correo ya existe');
        }

        let { rows: roles } = await client.query(
            "SELECT id_rol FROM roles WHERE LOWER(rol_cod) = 'usuario' ORDER BY id_rol LIMIT 1"
        );
        if (roles.length === 0) {
            const result = await client.query(
                "INSERT INTO roles (rol_cod, descripcion) VALUES ('usuario', 'Usuario predeterminado') RETURNING id_rol"
            );
            roles = result.rows;
        }

        const { rows: users } = await client.query(
            'INSERT INTO usuarios (usuario, documento, email, password) VALUES ($1, $2, $3, $4) RETURNING id',
            [userData.usuario, userData.documento, userData.email, userData.password]
        );
        await client.query(
            'INSERT INTO usuarios_roles (id_usuario, id_rol) VALUES ($1, $2)',
            [users[0].id, roles[0].id_rol]
        );
        await client.query('COMMIT');
        return users[0];
    } catch (err) {
        await client.query('ROLLBACK');
        throw err;
    } finally {
        client.release();
    }
}

export default {
    findByDocument,
    findByEmail,
    findCargoByDocument,
    findRolesByDocument,
    create,
    createWithDefaultRole
};
