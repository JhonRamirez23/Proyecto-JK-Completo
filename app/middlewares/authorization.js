// import getConnection from "../models/mysql/db.js";
// import jwt from "jsonwebtoken";
// import dotenv from 'dotenv';
// dotenv.config();

// //Función para traer el cargo de un empleado.
// async function obtenerRol(rolId) {
//     try {
//         const conn = await getConnection();
//         const [rolEmpleado] = await conn.promise().query('SELECT cargo FROM empleados WHERE cargo = ?', [rolId]);
//         if (rolEmpleado.length > 0) {
//             console.log(rolEmpleado);
//             return rolEmpleado[0].cargo;
//         } else {
//             return null; //Si el empleado no tiene cargo asignado.
//         }        
//     } catch (err) {
//         console.log("Error al obtener el rol del empleado:", err);
//         return null;
//     }
// }

// //Función para verificar el rol del usuario
// export function verificarRol(rolesPermitidos) {
//     return async function(req, res, next) {

//         //Obtener el token de autorización del encabezado de la solictud.
//         const tokenCookie = req.headers.cookie && req.headers.cookie.split('; ').find(cookie => cookie.trim().startsWith('jwt='));
//         const token = tokenCookie && tokenCookie.split('=')[1];
//         console.log("Token:", tokenCookie, token);

//         //Verificar si se proporcionó un token.
//         if (!token) {
//             return res.redirect('/inicio');
//         }

//         try {
//             //Verificar y decodificar el token
//             const decoded = jwt.verify(token, process.env.SECRET_KEY);

//             //Obterner el cargo del empleado
//             const cargo = await obtenerRol(decoded.rol_id);

//             //Comprobar si el cargo está permitido y asignar el rol correspondiente.
//             let rol;
//             switch (cargo) {
//                 case 'admin':
//                     rol = 'admin';
//                     break;
//                 case 'vendedor':
//                     rol = 'vendedor';
//                     break;
//                 case 'clientes':
//                     rol = 'clientes';
//                     break;
//                 case 'inventario':
//                     rol = 'inventario';
//                     break;
//                 default:
//                     rol = null; //Si el cargo no coincide con ningún rol.
//             }

//             //Comprobar si el rol del usuario está permitido
//             if (!rol || !rolesPermitidos.includes(rol)) {
//                 return res.status(403).send({ status: "Error", message: "No tienes permisos para acceder a esta ruta" });
//             }

//             //Si el usuario tiene el rol adecuado, pasamos al siguiente middleware.
//             next();
//         } catch (err) {
//             //Si hay un error al verificar el token, devolvemos un error de autenticación.
//             console.log("Error al verificar el token:", err);
//             return res.status(401).send({ status: "Error", message: "Token de autorización inválido" });
//         }
//     };
// }

// //Definir los roles permitidos.
// const rolesPermitidos = ['admin', 'vendedor', 'clientes', 'inventario'];

// export default rolesPermitidos;

import authService from '../services/auth.service.js';

async function getAuthenticatedPayload(req) {
    const token = req.cookies?.jwt;
    if (!token) return null;
    return authService.validateToken(token);
}

export const isAuthenticated = async (req, res, next) => {
    let payload;
    try {
        payload = await getAuthenticatedPayload(req);
    } catch (err) {
        return res.status(500).send({ status: 'Error', message: 'Error interno del servidor' });
    }

    if (!payload) return res.redirect('/inicio');
    req.auth = payload;
    return next();
};

export const isAdmin = async (req, res, next) => {
    let payload;
    let cargo;
    try {
        payload = await getAuthenticatedPayload(req);
        if (payload) cargo = await authService.getCargoByDocument(payload.usuario);
    } catch (err) {
        return res.status(500).send({ status: 'Error', message: 'Error interno del servidor' });
    }

    if (!payload) return res.redirect('/inicio');
    if (cargo !== 'admin') {
        return res.status(403).send({ status: 'Error', message: 'No tienes permisos para acceder a esta ruta' });
    }

    req.auth = payload;
    return next();
};
