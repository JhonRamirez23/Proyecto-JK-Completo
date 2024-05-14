//Se importa bcrypt para encriptar la contraseña
import bcrypt from 'bcryptjs';

//Prueba para traer la config de la BD
import getConnection from '../models/mysql/db.js';

//Se importa la librería para token de autorización
import jwt from 'jsonwebtoken';

//Se importa la encriptación de los datos
import dotenv from 'dotenv';
dotenv.config();

async function login(req, res){
    const nip = req.body.nip;
    const password = req.body.password;
    
    //Validación de NIP y contraseña
    if (!nip || !password) {
        return res.status(400).send({ status: "Error", message: "Los campos están incompletos" });
    }
    
    //Verifica si el usuario existe en la BD
    try {
        const conn = await getConnection(); //Conector a la BD
        const [usuarioExiste] = await conn.promise().query('SELECT * FROM usuarios WHERE nip = ?', [nip]);

        if (usuarioExiste.length === 0) {
            return res.status(400).send({ status: "Error", message: "Usuario no existe"});
        }

        //Ingresa en una constante la contraseña para usarla en la encriptación.
        const hashPassword = usuarioExiste[0].password;

        //Verifica que la contraseña encriptada sea correcta.
        const loginCorrecto = await bcrypt.compare(password, hashPassword);
        
        //Valida el ingreso
        if (!loginCorrecto) {
            return res.status(400).send({ status: "Error", message: "Usuario o contraseña incorrecta" });
        }
        res.send({ status: "OK", redirect: '/admin'});
    } catch (err) {
        console.log("Error al procesar la solicitud");
        res.status(500).send({ status: "Error", message: "Error interno del servidor"});
    }
}

async function register(req, res) {
    const user = req.body.user;
    const nip = req.body.nip;
    const email = req.body.email;
    const password = req.body.password;

    //Validación de datos
    if (!user || !email || !password || !nip) {
        return res.status(400).send({
            status: "Error", message: "Los campos están incompletos"
        });
    }

    //Establece conn como conector de consultas
    const conn = getConnection();

    ////Verifica si el correo ya existe en la BD
    const [usuarioExistente] = await conn.promise().query('SELECT * FROM usuarios WHERE email = ?', [email]);
    if (usuarioExistente.length > 0 ) {
        return res.status(400).send({ status: "Error", message: "El Email ya existe" });
    }

    /*
        En código de la consulta, utilizamos conn.promise().query() en lugar de conn.query() para realizar 
        consultas SQL de forma asíncrona y utilizar await para esperar la respuesta de la base de datos. 
        Además, utilizamos un bloque try-catch para manejar los errores de forma adecuada.
    */

    //Si no existe, procede con el registro

    //Aquí se encripta las contraseñas
    const salt = await bcrypt.genSalt(5);
    const hashPassword = await bcrypt.hash(password, salt);

    const nuevoUsuario = {
        user,
        nip,
        email,
        password: hashPassword
    }

    conn.query('INSERT INTO usuarios SET ?', nuevoUsuario, async(err, rows) => {
        if (err) {
            console.log(err);
            return res.status(500).send({ status: "Error", message: "Error al insertar el usuario en la BD" });
        }
        res.redirect('/login');
    });
}

export const methods = {
    login,
    register,
}
