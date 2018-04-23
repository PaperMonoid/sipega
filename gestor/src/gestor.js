const express = require('express')
const bodyParser = require('body-parser')
const app = express()

const mergeJSON = require('merge-json')

const bd = require('./bd.js')
const docente = require('./docente.js')
const materia = require('./materia.js')
const grupo = require('./grupo.js')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}))

const enviar = respuesta => dato => respuesta.send(dato)

// REST API del Docente.
app.post(
    '/docente/crear',
    (peticion, respuesta) =>
        bd.conectar()
        .then(docente.crear(peticion.body))
        .then(enviar(respuesta))
        .then(bd.terminar)
)

app.put(
    '/docente/:noControl',
    (peticion, respuesta) =>
        bd.conectar()
        .then(docente.modificar(mergeJSON.merge(peticion.params, peticion.body)))
        .then(enviar(respuesta))
        .then(bd.terminar)
)

app.get(
    '/docente/:noControl',
    (peticion, respuesta) =>
        bd.conectar()
        .then(docente.consultar(peticion.params))
        .then(enviar(respuesta))
        .then(bd.terminar)
)

app.delete(
    '/docente/:noControl',
    (peticion, respuesta) =>
        bd.conectar()
        .then(docente.borrar(peticion.params))
        .then(enviar(respuesta))
        .then(bd.terminar)
)

// REST API de los grupos de las materias y docentes.
app.post(
    '/docente/:noControl/materia/:materiaClave/grupo/:grupoClave/crear',
    (peticion, respuesta) =>
        bd.conectar()
        .then(grupo.crear(mergeJSON.merge(peticion.params, peticion.body)))
        .then(enviar(respuesta))
        .then(bd.terminar)
)

app.put(
    '/docente/:noControl/materia/:materiaClave/grupo/:grupoClave',
    (peticion, respuesta) =>
        bd.conectar()
        .then(grupo.modificar(mergeJSON.merge(peticion.params, peticion.body)))
        .then(enviar(respuesta))
        .then(bd.terminar)
)

app.get(
    '/docente/:noControl/materia/:materiaClave/grupo/:grupoClave',
    (peticion, respuesta) =>
        bd.conectar()
        .then(grupo.consultar(peticion.params))
        .then(enviar(respuesta))
        .then(bd.terminar)
)

app.delete(
    '/docente/:noControl/materia/:materiaClave/grupo/:grupoClave',
    (peticion, respuesta) =>
        bd.conectar()
        .then(grupo.borrar(peticion.params))
        .then(enviar(respuesta))
        .then(bd.terminar)
)

// REST API de los materia.
app.post(
    '/materia/crear',
    (peticion, respuesta) =>
        bd.conectar()
        .then(materia.crear(peticion.body))
        .then(enviar(respuesta))
        .then(bd.terminar)
)

app.get(
    '/materia/:materiaClave',
    (peticion, respuesta) =>
        bd.conectar()
        .then(materia.consultar(peticion.params))
        .then(enviar(respuesta))
        .then(bd.terminar)
)

app.delete(
    '/materia/:materiaClave',
    (peticion, respuesta) =>
        bd.conectar()
        .then(materia.borrar(peticion.params))
        .then(enviar(respuesta))
        .then(bd.terminar)
)

app.listen(
    3000,
    () =>
        console.log('Autentificador escuchando en el puerto 3000...')
)
