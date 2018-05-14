const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const router = express.Router();
const { analizarConsultas, restificarConsultas } = require("./bd.js");

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

const usuario = require("./puntos_finales/usuario.js");
const privilegio = require("./puntos_finales/privilegio.js");
const acceso = require("./puntos_finales/acceso.js");
const token = require("./puntos_finales/token.js");
const autorizador = require("./puntos_finales/autorizador.js");

app.use("/usuario", usuario);
app.use("/privilegio", privilegio);
app.use("/usuario", acceso);
app.use("/token", token);
app.use("/privilegio", autorizador);
app.use("/", router);
app.listen(
    3001,
    () =>
        console.log('Autentificador escuchando en el puerto 3001...')
)
