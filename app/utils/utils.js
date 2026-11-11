//Para crear los tokens
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { randomUUID } from 'node:crypto';
dotenv.config();

async function generarToken(documento, rol) {
    return jwt.sign(
        { usuario: documento, rol },
        process.env.SECRET_KEY,
        { expiresIn: '1h', jwtid: randomUUID() });
};

export function verificarToken(token) {
    return jwt.verify(token, process.env.SECRET_KEY);
}

export default generarToken;
