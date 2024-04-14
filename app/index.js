//Uso de import según las reglas de ES6
import express from 'express';

//Fix para __dirname
import path from 'path';
import { fileURLToPath } from 'url';

//Se importan los métodos que vienen de auth.controllers.js
import { methods as authentication } from './controllers/auth.controller.js';

//El __dirname es para cuando se especifica en el archivo package.json el "type": "module"
const __dirname = path.dirname(fileURLToPath(import.meta.url));

//Server -> Hace los cálculos de los datos de los usuarios
const app = express();
app.set('port', 4000);
app.listen(app.get('port'));
console.log("Servidor escuchando en puerto", app.get('port'));

//Configuración
app.use(express.static(__dirname + '/public'));
app.use(express.json());


//Rutas
app.get('/inicio', (req, res) => {
    res.sendFile(__dirname + '/pages/index.html');
})

app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/pages/login.html');
})

app.get('/register', (req, res) => {
    res.sendFile(__dirname + '/pages/register.html');
})

//Ruta del módulo admin
app.get('/admin', (req, res) => {
    res.sendFile(__dirname + '/pages/admin/admin.html');
})

//Ruta de la API
app.post('/api/register', authentication.register);
app.post('/api/login', authentication.login);