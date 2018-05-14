const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const router = express.Router();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

const docente = require("./puntos_finales/docente.js");
const materia = require("./puntos_finales/materia.js");
const grupo = require("./puntos_finales/grupo.js");

app.use("/docente", docente);
app.use("/materia", materia);
app.use("/docente", grupo);
app.listen(
    3002,
    () =>
        console.log('Gestor escuchando en el puerto 3002...')
)
