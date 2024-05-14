import JsonWebToken from "jsonwebtoken";
import dotenv from 'dotenv';


dotenv.config();

function Admin (req, res, next) {
    const loggin = revisarCookie(req);
    if (loggin) {
        return next();
    }
    return res.redirect('/inicio')
}

function Employes (req, res, next) {

}

function Inventory(req, res, next) {

}

function Sales (req, res, next) {

}

function revisarCookie (req) {
    try {
    const cookieJWT = req.headers.cookie.split('; ').find(cookie => cookie.startsWith('jwt=')).slice(4);
    const decodificado = JsonWebToken.verify(cookieJWT, process.env.JWT_SECRET);
    
    const usuarioRevisar = usuarios.find(usuario => usuario.user === decodificado.user);
    if(!usuarioRevisar) {
        return false
    }
    return true;
    }
    catch {
        return false;
    }
}

export const methods = {
    Admin,
    Employes,
    Inventory,
    Sales,
}