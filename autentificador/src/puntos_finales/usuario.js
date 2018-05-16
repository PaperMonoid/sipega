const express = require("express");
const router = express.Router();
const { crear, buscar, buscarTodos } = require("../modelos/usuario.js");
const { ejecutar } = require("../modelos/autorizador.js");
const privilegios = require("./privilegios.json");

router.get("/:id", ejecutar(buscar, privilegios.lectura));
router.get("/", ejecutar(buscarTodos, privilegios.lectura));
router.post("/", ejecutar(crear, privilegios.ninguno));

module.exports = router;
