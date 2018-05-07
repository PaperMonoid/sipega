const crypto = require('crypto');
const usuario = require('./usuario.json');
const { analizar } = require("./bd.js");

const cifrar = texto => crypto.createHmac("sha256", texto).digest("hex");

exports.consultar = analizar(usuario["consultar"]);
exports.borrar = analizar(usuario["borrar"]);
exports.crear = json => {
    json["usuarioClave"] = cifrar(json["usuarioClave"]);
    return analizar(usuario["crear"])(json);
};
