const R = require("ramda");
const { obtenerIdInsertado } = require("../bd.js");

const paginacion = 10;
const paginar = pagina => (pagina - 1) * paginacion;

const Privilegio = json => ({
    "id": json["PrivilegioId"],
    "descripcion": json["PrivilegioDescripcion"],
    "fechaCreacion": json["PrivilegioFechaCreacion"]
});

const buscar = parametros => conexion =>
      conexion.query(
          "SELECT PrivilegioId, PrivilegioDescripcion, PrivilegioFechaCreacion FROM Privilegio WHERE PrivilegioId = ?",
          [
              parametros["id"]
          ]
      )
      .then(R.compose(R.head, R.map(Privilegio)));

const buscarTodos = parametros => conexion =>
      conexion.query(
          "SELECT PrivilegioId, PrivilegioDescripcion, PrivilegioFechaCreacion FROM Privilegio LIMIT ?, ?",
          [
              paginar(parametros["pagina"]),
              paginacion
          ]
      )
      .then(R.map(Privilegio));

const crear = parametros => conexion =>
      conexion.query(
          "INSERT INTO Privilegio(PrivilegioDescripcion, PrivilegioFechaCreacion) VALUES(?, NOW())",
          [
              parametros["descripcion"]
          ]
      )
      .then(obtenerIdInsertado);

module.exports = {
    "Privilegio": Privilegio,
    "buscar": buscar,
    "buscarTodos": buscarTodos,
    "crear": crear
}
