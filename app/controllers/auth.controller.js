// Controlador de autenticación — adaptador HTTP.
// Capa: controllers. Solo traduce solicitudes HTTP a llamadas del service y convierte resultados en respuestas.
// No ejecuta consultas SQL directamente.

import dotenv from 'dotenv';
dotenv.config();

import authSvc from '../services/auth.service.js';

// Login: delega la lógica de negocio al service.
async function login(req, res) {
    const { documento, password } = req.body ?? {};
    try {
        const result = await authSvc.login(documento, password);
        res.cookie('jwt', result.token, cookieOptions());
        res.send({ status: 'OK', redirect: result.redirect });
    } catch (err) {
        if (err.message === 'Los campos están incompletos') {
            return res.status(400).send({ status: 'Error', message: 'Completa todos los campos requeridos.' });
        }
        if (err.message === 'Usuario o contraseña incorrecta') {
            return res.status(401).send({ status: 'Error', message: 'Documento o contraseña incorrectos.' });
        }
        if (err.message === 'El usuario no tiene un rol válido asignado') {
            return res.status(403).send({
                status: 'Error',
                message: 'Tu cuenta no tiene un único rol válido asignado. Contacta a un administrador.'
            });
        }
        console.log("Error al procesar la solicitud");
        res.status(500).send({ status: "Error", message: "Error interno del servidor" });
    }
}

// Logout: mantiene el mismo comportamiento (limpiar cookie y redirigir).
async function logout(req, res) {
    const token = req.cookies?.jwt;
    if (token) {
        try {
            await authSvc.revokeToken(token);
        } catch (err) {
            console.error('Error al revocar el token de cierre de sesión:', err);
            return res.status(500).send({ status: 'Error', message: 'No se pudo cerrar sesión' });
        }
    }
    res.clearCookie('jwt', { path: '/', httpOnly: true, secure: process.env.NODE_ENV === 'production' });
    res.send({ status: "OK", redirect: '/login' });
}

async function session(req, res) {
    try {
        const payload = await authSvc.validateToken(req.cookies?.jwt);
        if (!payload) {
            return res.send({ status: 'OK', authenticated: false, usuario: null });
        }
        return res.send({ status: 'OK', authenticated: true, usuario: payload.usuario });
    } catch (err) {
        console.error('Error al validar la sesión:', err.message);
        res.status(500).send({ status: "Error", message: "Error interno de la servidor" });
    }
}

function cookieOptions() {
    return {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: process.env.JWT_COOKIE_EXPIRES * 60 * 60 * 1000,
        path: '/'
    };
}

// Register: delega la creación y validaciones al service.
async function register(req, res) {
    const userData = req.body ?? {};
    try {
        await authSvc.register(userData);
        res.send({ status: 'OK', message: 'Registro exitoso', redirect: '/login' });
    } catch (err) {
        if (err.message === 'Los campos están incompletos') {
            return res.status(400).send({ status: 'Error', message: 'Completa todos los campos requeridos.' });
        }
        if (err.message === 'El usuario o el correo ya existe') {
            return res.status(409).send({
                status: 'Error',
                message: 'Ya existe un usuario con ese nombre de usuario o correo electrónico.'
            });
        }
        console.error('Error al registrar el usuario:', err);
        return res.status(500).send({
            status: 'Error',
            message: 'No fue posible completar el registro. Solicita a un administrador que gestione tu acceso.'
        });
    }
}

export const methods = {
    login,
    register,
    logout,
    session
};
