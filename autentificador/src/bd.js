const mysql = require('promise-mysql')

exports.conectar = () => mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: process.env.DB_PASSWORD,
    database: 'Sipega'
})

exports.terminar = conexion => Promise.resolve(conexion => conexion.end())

exports.analizar = datos => json => conexion =>
      conexion.query(
          datos["sentencia"],
          datos["parametros"].map(llave => json[llave])
      )
      .then(resultado => {
          if (Array.isArray(resultado)) {
              return resultado.map(elemento => {
                  const respuesta = {}
                  for (let llave in datos["resultado"]) {
                      respuesta[llave] = elemento[datos["resultado"][llave]];
                  }
                  return respuesta;
              });
          } else {
              const respuesta = {}
              for (let llave in datos["resultado"]) {
                  respuesta[llave] = resultado[datos["resultado"][llave]];
              }
              return [respuesta];
          }
      });
