const express = require("express");
const router = express.Router();
const {
    crear,
    buscar,
    buscarTodos,
    modificar,
    eliminar
} = require("../modelos/materia.js");
const { ejecutar } = require("../modelos/autorizador.js");
const privilegios = require("./privilegios.json");

router.get("/:clave", ejecutar(buscar, privilegios.lectura));
router.get("/", ejecutar(buscarTodos, privilegios.lectura));
router.post("/:clave", ejecutar(crear, privilegios.escritura));
router.put("/:clave", ejecutar(modificar, privilegios.escritura));
router.delete("/:clave", ejecutar(eliminar, privilegios.escritura));

module.exports = router;
