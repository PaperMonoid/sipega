const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const router = express.Router();

const R = require("ramda");
const mergeJSON = require('merge-json');
const bd = require('./bd.js');
const { analizarConsultas, restificarConsultas } = require("./bd.js");
const crypto = require('crypto');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

const enviar = respuesta => dato => respuesta.send(dato);

// REST API del usuario
const usuarioJson = require("./usuario.json");
const usuario = analizarConsultas(usuarioJson);
const cifrar = texto => crypto.createHmac("sha256", texto).digest("hex");
usuario["/usuario"]["post"] = R.compose(
    usuario["/usuario"]["post"],
    json => {
        json["usuarioClave"] = cifrar(json["usuarioClave"]);
        return json;
    }
);
restificarConsultas(usuario)(router);

// REST API de los privilegios.
const privilegioJson = require('./privilegio.json');
const privilegio = analizarConsultas(privilegioJson);
restificarConsultas(privilegio)(router);

// REST API de los privilegios de los usuarios.
const accesoJson = require('./acceso.json');
const acceso = analizarConsultas(accesoJson);
restificarConsultas(acceso)(router);
console.log(acceso)

// REST API de los privilegios de los usuarios.
/*app.post(
    '/usuario/:usuarioId/privilegio/:privilegioId',
    (peticion, respuesta) =>
        bd.conectar()
        .then(acceso.asignar(mergeJSON.merge(peticion.params, peticion.body)))
        .then(enviar(respuesta))
        .then(bd.terminar)
)

app.get(
    '/usuario/:usuarioId/privilegio/:privilegioId',
    (peticion, respuesta) =>
        bd.conectar()
        .then(acceso.consultar(peticion.params))
        .then(enviar(respuesta))
        .then(bd.terminar)
)*/

app.use("/", router);
app.listen(
    3001,
    () =>
        console.log('Autentificador escuchando en el puerto 3001...')
)
