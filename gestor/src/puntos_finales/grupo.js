const express = require("express");
const router = express.Router();
const {
    crear,
    buscar,
    buscarTodos,
    modificar,
    eliminar
} = require("../modelos/grupo.js");
const { ejecutar } = require("../modelos/autorizador.js");
const privilegios = require("./privilegios.json");

router.get("/:noControl/materia/:materiaClave/grupo/:clave", ejecutar(buscar, privilegios.lectura));
router.get("/:noControl/materia/:materiaClave/grupo", ejecutar(buscarTodos, privilegios.lectura));
router.post("/:noControl/materia/:materiaClave/grupo/:clave", ejecutar(crear, privilegios.escritura));
router.put("/:noControl/materia/:materiaClave/grupo/:clave", ejecutar(modificar, privilegios.escritura));
router.delete("/:noControl/materia/:materiaClave/grupo/:clave", ejecutar(eliminar, privilegios.escritura));

module.exports = router;

