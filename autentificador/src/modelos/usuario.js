const R = require("ramda");
const { cifrarClave } = require("../cifrado.js");
const { obtenerIdInsertado } = require("../bd.js");

const paginacion = 10;
const paginar = pagina => (pagina - 1) * paginacion;

const Usuario = json => ({
    "id": json["UsuarioId"],
    "clave": json["UsuarioClave"],
    "fechaCreacion": json["UsuarioFechaCreacion"]
});

const buscar = parametros => conexion =>
      conexion.query(
          "SELECT UsuarioId, UsuarioClave, UsuarioFechaCreacion FROM Usuario WHERE UsuarioId = ?",
          [
              parametros["id"]
          ]
      )
      .then(R.compose(R.head, R.map(Usuario)));

const buscarClave = parametros => conexion =>
      conexion.query(
          "SELECT UsuarioId, UsuarioClave, UsuarioFechaCreacion FROM Usuario WHERE UsuarioId = ? AND UsuarioClave = ?",
          [
              parametros["id"],
              cifrarClave(parametros["clave"])
          ]
      )
      .then(R.compose(R.head, R.map(Usuario)));

const buscarTodos = parametros => conexion =>
      conexion.query(
          "SELECT UsuarioId, UsuarioClave, UsuarioFechaCreacion FROM Usuario LIMIT ?, ?",
          [
              paginar(parametros["pagina"]),
              paginacion
          ]
      )
      .then(R.map(Usuario));

const crear = parametros => conexion =>
      conexion.query(
          "INSERT INTO Usuario(UsuarioClave, UsuarioFechaCreacion) VALUES(?, NOW())",
          [
              cifrarClave(parametros["clave"])
          ]
      )
      .then(obtenerIdInsertado);

module.exports = {
    "Usuario": Usuario,
    "buscar": buscar,
    "buscarClave": buscarClave,
    "buscarTodos": buscarTodos,
    "crear": crear
}
