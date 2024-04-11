//Uso de import según las reglas de ES6
import express from 'express';

//Fix para __dirname
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

//Server -> Hace los cálculos de los datos de los usuarios
const app = express();
app.set('port', 4000);
app.listen(app.get('port'));
console.log("Servidor escuchando en puerto", app.get('port'));

//Configuración
app.use(express.static(__dirname + '/public'));


//Rutas
app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/pages/login.html'); //El __dirname es cuando se especifica en archivo package.json el "type": "module"
})

app.get('/register', (req, res) => {
    res.sendFile(__dirname + '/pages/register.html');
})