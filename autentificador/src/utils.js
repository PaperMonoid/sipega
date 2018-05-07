const mergeJSON = require('merge-json');
const bd = require("./bd.js");

const enviar = respuesta => dato => respuesta.send(dato);

exports.procesar = sentencia => (peticion, respuesta) =>
      bd.conectar()
      .then(sentencia(mergeJSON.merge(peticion.params, peticion.body)))
      .then(enviar(respuesta))
      .then(bd.terminar);
