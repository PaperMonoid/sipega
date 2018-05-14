const R = require("ramda");
const bd = require("../bd.js")
const mergeJSON = require("merge-json");
const { verificar } = require("./token.js");
const { buscar } = require("./acceso.js");

const existeCualquiera = R.any(R.compose(R.not, R.isNil));
const existeIgual = a => b => R.isNil(a) || R.not(R.isNil(a)) && (a == 'true') == b;
const mergeJSONS = (...jsons) => jsons.reduce(mergeJSON.merge, {});
const enviar = respuesta => dato => respuesta.send(dato);

const validarAcceso = parametros => requerimiento => conexion =>
      buscar(parametros)(conexion)
      .then(acceso => {
          if (acceso &&
              existeCualquiera([requerimiento["lectura"], requerimiento["escritura"], requerimiento["ejecucion"]]) &&
              existeIgual(requerimiento["lectura"])(acceso["lectura"]) &&
              existeIgual(requerimiento["escritura"])(acceso["escritura"]) &&
              existeIgual(requerimiento["ejecucion"])(acceso["ejecucion"])) {
              return { "acceso": true };
          } else {
              return { "acceso": false };
          }
      });

const validarTokenAcceso = token => requerimiento => conexion =>
      Promise.resolve(verificar(token))
      .then(token => ({
          "usuarioId" : token["id"],
          "privilegioId": requerimiento["privilegioId"]
      }))
      .then(parametros => validarAcceso(parametros)(requerimiento)(conexion));

// TODO permitir que el administrador pueda hacerlo todo
const verificarAcceso = (sentencia, requerimiento, parametros) => conexion =>
      Promise.resolve(verificar(parametros["token"]))
      .then(token => ({
          "usuarioId" : token["id"],
          "privilegioId": requerimiento["privilegioId"]
      }))
      .then(parametros => buscar(parametros)(conexion))
      .then(acceso => {
          if (acceso &&
              existeCualquiera([requerimiento["lectura"], requerimiento["escritura"], requerimiento["ejecucion"]]) &&
              existeIgual(requerimiento["lectura"])(acceso["lectura"]) &&
              existeIgual(requerimiento["escritura"])(acceso["escritura"]) &&
              existeIgual(requerimiento["ejecucion"])(acceso["ejecucion"])) {
              return sentencia(parametros)(conexion);
          } else {
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
    "ejecutar": ejecutar,
    "validarAcceso": validarAcceso,
    "validarTokenAcceso": validarTokenAcceso
};
