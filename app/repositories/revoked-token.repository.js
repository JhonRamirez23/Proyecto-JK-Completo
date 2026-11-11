import getConnection from '../config/database.js';

async function isRevoked(jti) {
    const conn = getConnection();
    const { rowCount } = await conn.query(
        'SELECT 1 FROM revoked_tokens WHERE jti = $1 AND expires_at > NOW()',
        [jti]
    );
    return rowCount > 0;
}

async function revoke(jti, expiresAt) {
    const conn = getConnection();
    await conn.query('DELETE FROM revoked_tokens WHERE expires_at <= NOW()');
    await conn.query(
        `INSERT INTO revoked_tokens (jti, expires_at)
         VALUES ($1, $2)
         ON CONFLICT (jti) DO NOTHING`,
        [jti, expiresAt]
    );
}

export default { isRevoked, revoke };
