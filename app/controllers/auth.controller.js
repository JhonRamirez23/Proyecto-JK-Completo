//Se importa la librería de encriptación de contraseñas
import bcrypt from 'bcryptjs';

//Se importa la librería para token de autorización
import jsonwebtoken from 'jsonwebtoken';

//Se importa la encriptación de los datos
import dotenv from 'dotenv';

dotenv.config();


//Usuarios de prueba
const usuarios = [
    { user: "John" },
    { email: "prueba@gmail.com" },
    { password: "hola" }
];

async function login(req, res){
    const user = req.body.user;
    const password = req.body.password;

    //Validación de datos
    if (!user || !password) {
        return res.status(400).send({
            status: "Error", message: "Los campos están incompletos"
        });
    }

    //Verifica si el usuario existe
    const usuarioRevisar = usuarios.find(usuario => usuario.user === user);
    if(!usuarioRevisar || !usuarioRevisar.password) {
        return res.status(400).send({ status: "Error", message: "Usuario o contraseña incorrectos" });
    } res.send({ status: "OK", message: "Usuario asignado", redirect: '/admin' });

    //Se verifica que la contraseña encriptada coincida con la del usuario
    // const loginCorrecto = await bcrypt.compare(password, usuarioRevisar.password);
    
    // Token de autorización
    // if (!loginCorrecto) {
    //     return res.status(400).send({
    //         status: "Error", message: "Validación incorrecta"
    //     });
    // }
    

    // const token = jsonwebtoken.sign(
    //     { user: usuarioRevisar.user },
    //     process.env.JWT_SECRET,
    //     { expiresIn: process.env.JWT_EXPIRATION });

    //     const cookieOption = {
    //     expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
    //     path: '/'
    //     }
    //     res.cookie('jwt', token, cookieOption); 
    //     res.send({ status: "OK", message: "Usuario asignado", redirect: '/admin' });
}

async function register(req, res) {
    const user = req.body.user;
    const email = req.body.email;
    const password = req.body.password;

    //Validación de datos
    if (!user || !email || !password) {
        return res.status(400).send({
            status: "Error", message: "Los campos están incompletos"
        });
    }

    //Verifica si el usuario existe
    const usuarioRevisar = usuarios.find(usuario => usuario.user === user);
    if(usuarioRevisar) {
        return res.status(400).send({
            status: "Error", message: "El usuario ya existe"
        });
    }

    //Aquí se encripta las contraseñas
    // const salt = await bcrypt.genSalt(5);
    // const hashPassword = await bcrypt.hash(password, salt);

    const nuevoUsuario = {
        user, email, password//: //hashPassword
    }
    
    usuarios.push(nuevoUsuario);
    console.log(nuevoUsuario);
    return res.status(201).send({
        status: "OK", message: `El usuario ${nuevoUsuario.user} fue creado con éxito`,
        redirect: "/login"
    });
}

export const methods = {
    login,
    register,
}