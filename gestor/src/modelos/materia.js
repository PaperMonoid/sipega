const R = require("ramda");
const { obtenerIdInsertado, obtenerFilasAfectadas } = require("../bd.js");

const paginacion = 10;
const paginar = pagina => (pagina - 1) * paginacion;

const Materia = json => ({
    "clave": json.MateriaClave,
    "nombre": json.MateriaNombre,
    "nombeAbreviado": json.MateriaNombreAbreviado
});

const buscar = parametros => conexion =>
      conexion.query(
          "SELECT MateriaClave, MateriaNombre, MateriaNombreAbreviado FROM Materia WHERE MateriaClave = ?",
          [
              parametros.clave
          ]
      )
      .then(R.compose(R.head, R.map(Materia)));

const buscarTodos = parametros => conexion =>
      conexion.query(
          "SELECT MateriaClave, MateriaNombre, MateriaNombreAbreviado FROM Materia LIMIT ?, ?",
          [
              paginar(parametros.pagina),
              paginacion
          ]
      )
      .then(R.map(Materia));

const modificar = parametros => conexion =>
      conexion.query(
          "UPDATE Materia SET MateriaClave = ?, MateriaNombre = ?, MateriaNombreAbreviado = ? WHERE MateriaClave = ?",
          [
              parametros.nuevaClave,
              parametros.nombre,
              parametros.nombreAbreviado,
              parametros.clave
          ]
      )
      .then(obtenerFilasAfectadas);

const crear = parametros => conexion =>
      conexion.query(
          "INSERT INTO Materia(MateriaClave, MateriaNombre, MateriaNombreAbreviado) VALUES(?, ?, ?)",
          [
              parametros.clave,
              parametros.nombre,
              parametros.nombreAbreviado
          ]
      )
      .then(_ => ({ "clave": parametros.clave }));

const eliminar = parametros => conexion =>
      conexion.query(
          "DELETE FROM Materia WHERE MateriaClave = ?",
          [
              parametros.clave
          ]
      )
      .then(obtenerFilasAfectadas);

module.exports = {
    "Materia": Materia,
    "buscar": buscar,
    "buscarTodos": buscarTodos,
    "modificar": modificar,
    "crear": crear,
    "eliminar": eliminar
}
