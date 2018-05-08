const mergeJSON = require('merge-json');
const mysql = require('promise-mysql');

exports.conectar = () => mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: process.env.DB_PASSWORD,
    database: 'Sipega'
});

exports.terminar = conexion => Promise.resolve(conexion => conexion.end());

const analizar = datos => json => conexion =>
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

exports.analizarConsultas = datos => {
    const objeto = {};
    for (let ruta in datos) {
        objeto[ruta] = {};
        for (let metodo in datos[ruta]) {
            objeto[ruta][metodo] = analizar(datos[ruta][metodo]);
        }
    }
    return objeto;
};

const enviar = respuesta => dato => respuesta.send(dato);

const procesar = sentencia => (peticion, respuesta) =>
      exports.conectar()
      .then(sentencia(mergeJSON.merge(peticion.params, peticion.body)))
      .then(enviar(respuesta))
      .then(exports.terminar);

exports.restificarConsultas = datos => router => {
    for (let ruta in datos) {
        for (let metodo in datos[ruta]) {
            router[metodo](ruta, procesar(datos[ruta][metodo]));
        }
    }
};
