const mysql = require('promise-mysql')

exports.conectar = () => mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: process.env.DB_PASSWORD,
    database: 'Sipega'
})

exports.terminar = conexion => Promise.resolve(conexion => conexion.end())
