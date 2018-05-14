const R = require("ramda");
const { obtenerIdInsertado } = require("../bd.js");

const paginacion = 10;
const paginar = pagina => (pagina - 1) * paginacion;

const Acceso = json => ({
    "id": json["AccesoId"],
    "usuarioId": json["AccesoUsuarioId"],
    "privilegioId": json["AccesoPrivilegioId"],
    "lectura": json["AccesoLectura"][0] == 1,
    "escritura": json["AccesoEscritura"][0] == 1,
    "ejecucion": json["AccesoEjecucion"][0] == 1,
    "fechaCreacion": json["AccesoFechaCreacion"]
});

const buscar = parametros => conexion =>
      conexion.query(
          "SELECT AccesoId, AccesoUsuarioId, AccesoPrivilegioId, AccesoLectura, AccesoEscritura, AccesoEjecucion, AccesoFechaCreacion FROM Acceso WHERE AccesoUsuarioId = ? AND AccesoPrivilegioId = ? ORDER BY AccesoFechaCreacion DESC LIMIT 1",
          [
              parametros["usuarioId"],
              parametros["privilegioId"]
          ]
      )
      .then(R.compose(R.head, R.map(Acceso)));

/**
 * Respeto para esta persona:
 * https://stackoverflow.com/questions/2411559/how-do-i-query-sql-for-a-latest-record-date-for-each-user
 */
const buscarTodos = parametros => conexion =>
      conexion.query(
          "SELECT t.AccesoId, t.AccesoUsuarioId, t.AccesoPrivilegioId, t.AccesoLectura, t.AccesoEscritura, t.AccesoEjecucion, t.AccesoFechaCreacion FROM Acceso t INNER JOIN (SELECT AccesoUsuarioId, AccesoPrivilegioId, max(AccesoFechaCreacion) as UltimaFechaCreacion FROM Acceso GROUP BY AccesoUsuarioId, AccesoPrivilegioId) tm ON t.AccesoUsuarioId = tm.AccesoUsuarioId AND t.AccesoPrivilegioId = tm.AccesoPrivilegioId AND t.AccesoFechaCreacion = tm.UltimaFechaCreacion LIMIT ?, ?",
          [
              paginar(parametros["pagina"]),
              paginacion
          ]
      )
      .then(R.map(Acceso));

const crear = parametros => conexion =>
      conexion.query(
          "INSERT INTO Acceso(AccesoUsuarioId, AccesoPrivilegioId, AccesoLectura, AccesoEscritura, AccesoEjecucion, AccesoFechaCreacion) VALUES(?, ?, ?, ?, ?, NOW())",
          [
              parametros["usuarioId"],
              parametros["privilegioId"],
              parametros["lectura"] == "TRUE",
              parametros["escritura"] == "TRUE",
              parametros["ejecucion"] == "TRUE"
          ]
      )
      .then(obtenerIdInsertado);

module.exports = {
    "Acceso": Acceso,
    "buscar": buscar,
    "buscarTodos": buscarTodos,
    "crear": crear
}
