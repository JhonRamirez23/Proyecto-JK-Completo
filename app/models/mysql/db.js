//Se importa MySQL
import mysql from 'mysql2';

//Configuración de la conexión a la BD
const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '',
  port: 3306,
  database: 'jk_db'
};

const conn = mysql.createConnection(dbConfig);

//Conexión a la BD
conn.connect((err) => {
  if (err) {
    console.log("Error al conectar a la BD", err);
    return;
  }
  console.log("Conexión a la BD establecida");
});

const getConnection = () => conn;

export default getConnection;