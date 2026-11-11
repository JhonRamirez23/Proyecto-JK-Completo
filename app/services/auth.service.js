// Servicio de autenticación — coordina login y register.
// Capa: services. Contiene reglas de negocio (criptografía, validaciones).
// No depende de Express ni de objetos req/res.

import bcrypt from 'bcryptjs';
import generarToken, { verificarToken } from '../utils/utils.js';
import userRepo from '../repositories/user.repository.js';
import revokedTokenRepo from '../repositories/revoked-token.repository.js';

const roleRedirects = {
    admin: '/admin',
    usuario: '/session',
    vendedor: '/sales-employes',
    cliente: '/clients',
    inventario: '/inventory'
};

// Valida credenciales y devuelve el token JWT si el login es correcto.
// Lanza un Error con mensaje descriptivo si falla.
async function login(documento, password) {
    if (documento == null || String(documento).trim() === '' || password == null || String(password).trim() === '') {
        throw new Error('Los campos están incompletos');
    }

    const usuarios = await userRepo.findByDocument(documento);
    if (usuarios.length === 0) {
        throw new Error('Usuario o contraseña incorrecta');
    }

    const hashPassword = usuarios[0].password;
    const loginCorrecto = await bcrypt.compare(password, hashPassword);
    if (!loginCorrecto) {
        throw new Error('Usuario o contraseña incorrecta');
    }

    const roles = await userRepo.findRolesByDocument(documento);
    if (roles.length !== 1 || !Object.hasOwn(roleRedirects, roles[0])) {
        throw new Error('El usuario no tiene un rol válido asignado');
    }

    const rol = roles[0];
    const token = await generarToken(documento, rol);
    return { token, rol, redirect: roleRedirects[rol] };
}

// Valida que el email no esté duplicado y crea un nuevo usuario.
async function register(userData) {
    const { usuario, documento, email, password } = userData;

    if ([usuario, documento, email, password].some((value) => typeof value !== 'string' || !value.trim())) {
        throw new Error('Los campos están incompletos');
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const nuevoUsuario = { usuario, documento, email, password: hashPassword };
    await userRepo.createWithDefaultRole(nuevoUsuario);
}

async function validateToken(token) {
    let payload;
    try {
        payload = verificarToken(token);
    } catch (err) {
        if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError' || err.name === 'NotBeforeError') {
            return null;
        }
        throw err;
    }

    if (!payload || typeof payload !== 'object' || !payload.usuario || !payload.jti || !payload.exp) {
        return null;
    }

    if (await revokedTokenRepo.isRevoked(payload.jti)) {
        return null;
    }

    return payload;
}

async function revokeToken(token) {
    let payload;
    try {
        payload = verificarToken(token);
    } catch (err) {
        if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError' || err.name === 'NotBeforeError') {
            return false;
        }
        throw err;
    }

    if (!payload || typeof payload !== 'object' || !payload.jti || !payload.exp) {
        return false;
    }

    await revokedTokenRepo.revoke(payload.jti, new Date(payload.exp * 1000));
    return true;
}

async function getCargoByDocument(documento) {
    return userRepo.findCargoByDocument(documento);
}

export default {
    login,
    register,
    validateToken,
    revokeToken,
    getCargoByDocument
};
