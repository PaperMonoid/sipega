const express = require("express");
const router = express.Router();
const {
    crear,
    buscar,
    buscarTodos,
    modificar,
    eliminar
} = require("../modelos/docente.js");
const { ejecutar } = require("../modelos/autorizador.js");
const privilegios = require("./privilegios.json");

router.get("/:noControl", ejecutar(buscar, privilegios.lectura));
router.get("/", ejecutar(buscarTodos, privilegios.lectura));
router.post("/:noControl", ejecutar(crear, privilegios.escritura));
router.put("/:noControl", ejecutar(modificar, privilegios.escritura));
router.delete("/:noControl", ejecutar(eliminar, privilegios.escritura));

module.exports = router;
