const express = require("express");
const router = express.Router();
const { ejecutar, validarTokenAcceso } = require("../modelos/autorizador.js");
const privilegios = require("./privilegios.json");

const acceso = parametros => conexion =>
      validarTokenAcceso(parametros["token"])(parametros)(conexion);

router.get("/:privilegioId/verificar/:token", ejecutar(acceso, privilegios.ninguno));

module.exports = router;
