const express = require("express");
const router = express.Router();
const { buscarClave } = require("../modelos/usuario.js");
const { ejecutar } = require("../modelos/autorizador.js");
const { verificar, obtener } = require("../modelos/token.js");
const privilegios = require("./privilegios.json");

const obtenerToken = parametros => conexion => buscarClave(parametros)(conexion)
      .then(respuesta => respuesta ? obtener(respuesta) : respuesta);

const verificarToken = parametros => conexion =>
      Promise.resolve(verificar(parametros["token"]));

router.post("/", ejecutar(obtenerToken, privilegios.ninguno));
router.get("/:token", ejecutar(verificarToken, privilegios.ninguno));

module.exports = router;
