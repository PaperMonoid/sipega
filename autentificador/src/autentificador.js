const express = require('express')
const bodyParser = require('body-parser')
const app = express()

const mergeJSON = require('merge-json')

const bd = require('./bd.js')
const usuario = require('./usuario.js')
const privilegio = require('./privilegio.js')
const acceso = require('./acceso.js')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}))

const enviar = respuesta => dato => respuesta.send(dato)

// REST API del Usuario.
app.post(
    '/usuario',
    (peticion, respuesta) =>
        bd.conectar()
        .then(usuario.crear(peticion.body))
        .then(enviar(respuesta))
        .then(bd.terminar)
)

app.get(
    '/usuario/:usuarioId',
    (peticion, respuesta) =>
        bd.conectar()
        .then(usuario.consultar(peticion.params))
        .then(enviar(respuesta))
        .then(bd.terminar)
)

app.delete(
    '/usuario/:usuarioId',
    (peticion, respuesta) =>
        bd.conectar()
        .then(usuario.borrar(peticion.params))
        .then(enviar(respuesta))
        .then(bd.terminar)
)

// REST API de los privilegios de los usuarios.
app.post(
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
)

// REST API de los privilegios.
app.post(
    '/privilegio',
    (peticion, respuesta) =>
        bd.conectar()
        .then(privilegio.crear(peticion.body))
        .then(enviar(respuesta))
        .then(bd.terminar)
)

app.get(
    '/privilegio/:privilegioId',
    (peticion, respuesta) =>
        bd.conectar()
        .then(privilegio.consultar(peticion.params))
        .then(enviar(respuesta))
        .then(bd.terminar)
)

app.delete(
    '/privilegio/:privilegioId',
    (peticion, respuesta) =>
        bd.conectar()
        .then(privilegio.borrar(peticion.params))
        .then(enviar(respuesta))
        .then(bd.terminar)
)

app.listen(
    3001,
    () =>
        console.log('Autentificador escuchando en el puerto 3001...')
)
