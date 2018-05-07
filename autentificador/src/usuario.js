const crypto = require('crypto');

const bd = require("./bd.js");
const importarConsultas = bd.importarConsultas;
const usuario = importarConsultas('./usuario.json');

const express = require('express');
const router = express.Router();

const cifrar = texto => crypto.createHmac("sha256", texto).digest("hex");
const enviar = respuesta => dato => respuesta.send(dato);

router.get(
    "/:usuarioId",
    (peticion, respuesta) =>{
        return bd.conectar()
            .then(usuario.consultar(peticion.params))
            .then(enviar(respuesta))
            .then(bd.terminar)
    }
);

router.delete(
    "/:usuarioId",
    (peticion, respuesta) =>
        bd.conectar()
        .then(usuario.borrar(peticion.body))
        .then(enviar(respuesta))
        .then(bd.terminar)
);

const crearUsuario = json => {
    json["usuarioClave"] = cifrar(json["usuarioClave"]);
    return usuario.crear(json);
}

router.post(
    "/",
    (peticion, respuesta) =>
        bd.conectar()
        .then(crearUsuario(peticion.body))
        .then(enviar(respuesta))
        .then(bd.terminar)
);

module.exports = router;
