const request = require("request-promise");
const R = require("ramda");
const mergeJSON = require("merge-json");
const bd = require("../bd.js");

const lista = dato => R.isNil(dato) ? [] : [dato];
const mergeJSONS = (...jsons) => jsons.reduce(mergeJSON.merge, {});
const enviar = respuesta => dato => respuesta.send(dato);

const accesos = parametros =>
      R.join("&", R.concat(
          lista(parametros.lectura).map(R.concat("lectura=")),
          lista(parametros.escritura).map(R.concat("escritura=")),
          lista(parametros.ejecucion).map(R.concat("ejecucion="))
      ));

const verificarAcceso = (sentencia, requerimiento, parametros) => conexion =>
      request({
          "uri": `http://localhost:3001/privilegio/${requerimiento.privilegioId}/verificar/${parametros.token}`,
          "qs": requerimiento
      })
      .then(JSON.parse)
      .then(respuesta => {
          if (respuesta.acceso) {
              return sentencia(parametros)(conexion);
          } else {
              console.log(requerimiento);
              throw new Error("Acceso denegado");
          }
      });


const ejecutar = (sentencia, requerimiento) => (peticion, respuesta) =>
      bd.conectar()
      .then(R.isEmpty(requerimiento)
            ? sentencia(mergeJSONS(
                peticion.params,
                peticion.query,
                peticion.body
            ))
            : verificarAcceso(sentencia, requerimiento, mergeJSONS(
                peticion.params,
                peticion.query,
                peticion.body
            )))
      .then(enviar(respuesta))
      .then(bd.terminar)
      .catch(e => {
          console.error("Fecha " + (new Date()) + ":\n" + (e.stack));
          respuesta.status(500).send("¡Hubo un error!");
      });

module.exports = {
    "ejecutar": ejecutar
};

