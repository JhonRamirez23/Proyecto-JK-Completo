import express from 'express';
const app = express();

//Se importa bcrypt para encriptar la contraseña
import bcrypt from 'bcryptjs';

//Se importa la sesión
import session from 'express-session';

//Importamos el JWT desde helpers
import generarToken from '../helpers/utils.js';

//Prueba para traer la config de la BD
import getConnection from '../models/mysql/db.js';

//Se importa la encriptación de los datos
import dotenv from 'dotenv';
dotenv.config();

//Se configura la sesión.
app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: process.env.NODE_ENV === 'production'}
}));

async function login(req, res){
    const documento = req.body.documento;
    const password = req.body.password;
    
    //Validación de documento y contraseña
    if (!documento || !password) {
        return res.status(400).send({ status: "Error", message: "Los campos están incompletos" });
    }
    
    //Verifica si el usuario existe en la BD
    try {
        const conn = await getConnection(); //Conector a la BD
        const [usuarioExiste] = await conn.promise().query('SELECT * FROM usuarios WHERE documento = ?', [documento]);

        if (usuarioExiste.length === 0) {
            return res.status(400).send({ status: "Error", message: "Usuario no existe"});
        }

        //Ingresa en una constante la contraseña para usarla en la encriptación.
        const hashpassword = usuarioExiste[0].password;

        //Verifica que la contraseña encriptada sea correcta.
        const loginCorrecto = await bcrypt.compare(password, hashpassword);
        
        //Valida el ingreso
        if (!loginCorrecto) {
            return res.status(401).send({ status: "Error", message: "Usuario o contraseña incorrecta" });
        }

        //Si la autenticación es exitosa, consultamos la tabla empleados para obtener el rol del usuario
        // const [rolEmpleado] = await conn.promise().query('SELECT cargo FROM empleados WHERE cargo = ?', [usuarioExiste[0].id]); 
        // if (rolEmpleado.length === 0) {
        //     return res.status(400).send({ status: "Error", message: "No se encontraron datos del empleado"});
        // }

        //Si la autenticación es exitosa, creamos el JWT.
        const token = await generarToken(documento);

        //Configuramos la cookie con el token y una duración de 1 hora
        const cookieOptions = {
            httpOnly: true,
            secure: true,
            maxAge: process.env.JWT_COOKIE_EXPIRES * 60 * 60 * 1000,
            path: '/'
        };

        //Configuramos la cookie en la respuesta
        res.cookie('jwt', token, cookieOptions);

        res.send({ status: "OK", redirect: '/admin'});
    } catch (err) {
        console.log("Error al procesar la solicitud");
        res.status(500).send({ status: "Error", message: "Error interno del servidor"});
    }   
}

/*
async function logout(req, res) {
    try {
        
    }
}
*/

async function register(req, res) {
    const usuario = req.body.user;
    const documento = req.body.documento;
    const email = req.body.email;
    const password = req.body.password;

    //Validación de datos
    if (!usuario || !email || !password || !documento) {
        return res.status(400).send({
            status: "Error", message: "Los campos están incompletos"
        });
    }

    //Establece conn como conector de consultas
    const conn = getConnection();

    ////Verifica si el email ya existe en la BD
    const [usuarioExistente] = await conn.promise().query('SELECT * FROM usuarios WHERE email = ?', [email]);
    if (usuarioExistente.length > 0 ) {
        return res.status(400).send({ status: "Error", message: "El email ya existe" });
    }

    /*
        En código de la consulta, utilizamos conn.promise().query() en lugar de conn.query() para realizar 
        consultas SQL de forma asíncrona y utilizar await para esperar la respuesta de la base de datos. 
        Además, utilizamos un bloque try-catch para manejar los errores de forma adecuada.
    */

    //Si no existe, procede con el registro

    //Aquí se encripta las contraseñas
    const salt = await bcrypt.genSalt(10);
    const hashpassword = await bcrypt.hash(password, salt);

    const nuevoUsuario = {
        usuario,
        documento,
        email,
        password: hashpassword
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
