//Uso de import según las reglas de ES6
import express from 'express';

//Imprtamos el cookie-parser para leer los datos de las cookies
import cookieParser from 'cookie-parser';

//Fix para __dirname
import path from 'path';
import { fileURLToPath } from 'url';

//Se importan los métodos que vienen de auth.controllers.js
import { methods as authentication } from './controllers/auth.controller.js';
import { methods as authorization } from './middlewares/authorization.js';

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
app.use(cookieParser());

//Rutas públicas
app.get('/inicio', (req, res) => { res.sendFile(__dirname + '/pages/index.html'); })
app.get('/login', (req, res) => { res.sendFile(__dirname + '/pages/login.html'); })
app.get('/register', (req, res) => { res.sendFile(__dirname + '/pages/register.html'); })

//Rutas del módulo Gerencias
app.get('/admin', (req, res) => { res.sendFile(__dirname + '/pages/admin/admin.html'); })
app.get('/images', (req, res) => { res.sendFile(__dirname + '/pages/admin/images.html'); })
app.get('/add', (req, res) => { res.sendFile(__dirname + '/pages/admin/add.html'); })
app.get('/data', (req, res) => { res.sendFile(__dirname + '/pages/admin/data-query.html'); })
app.get('/updates', (req, res) => { res.sendFile(__dirname + '/pages/admin/update.html'); })
app.get('/sales', (req, res) => { res.sendFile(__dirname + '/pages/admin/sales.html'); })

//Rutas del módulo Ventas
app.get('/sales-employes', (req, res) => { res.sendFile(__dirname + '/pages/employes/employes.html'); })

//Rutas del módulo Clientes

//Rutas del módulo Inventario

//Ruta de la API
app.post('/api/register', authentication.register);
app.post('/api/login', authentication.login);

