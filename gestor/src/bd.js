const mysql = require('promise-mysql');

const conectar = () => mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: process.env.DB_PASSWORD,
    database: 'Sipega'
});

const terminar = conexion =>
      Promise.resolve(conexion => conexion.end());

const obtenerIdInsertado = json => ({
    "id" : json["insertId"]
});

const obtenerFilasAfectadas = json => ({
    "filasAfectadas" : json["affectedRows"]
});

module.exports = {
    "conectar": conectar,
    "terminar": terminar,
    "obtenerIdInsertado": obtenerIdInsertado,
    "obtenerFilasAfectadas": obtenerFilasAfectadas
};
