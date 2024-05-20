//Para crear los tokens
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

async function generarToken(documento) {
    return jwt.sign(
        { usuario: documento },
        process.env.SECRET_KEY,
        { expiresIn: '1h' });
};

export default generarToken;