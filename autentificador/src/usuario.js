const crypto = require('crypto');
const express = require('express');
const router = express.Router();

const { procesar } = require("./utils.js");
const { importarConsultas } = require("./bd.js");

const cifrar = texto => crypto.createHmac("sha256", texto).digest("hex");
const crearUsuario = json => {
    json["usuarioClave"] = cifrar(json["usuarioClave"]);
    return usuario.crear(json);
};

const usuario = importarConsultas('./sentencias/usuario.json');

router.post(
    "/",
    procesar(crearUsuario)
);

router.get(
    "/:usuarioId",
    procesar(usuario.consultar)
);

router.delete(
    "/:usuarioId",
    procesar(usuario.borrar)
);

module.exports = router;
