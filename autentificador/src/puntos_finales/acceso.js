const express = require("express");
const router = express.Router();
const { crear, buscar, buscarTodos } = require("../modelos/acceso.js");
const { ejecutar } = require("../modelos/autorizador.js");
const privilegios = require("./privilegios.json");

router.get("/:usuarioId/privilegio/:privilegioId", ejecutar(buscar, privilegios.lectura));
router.get("/:usuarioId/privilegio", ejecutar(buscarTodos, privilegios.lectura));
router.post("/:usuarioId/privilegio/:privilegioId", ejecutar(crear, privilegios.escritura));

module.exports = router;
