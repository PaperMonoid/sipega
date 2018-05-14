const R = require("ramda");
const { obtenerIdInsertado, obtenerFilasAfectadas } = require("../bd.js");

const paginacion = 10;
const paginar = pagina => (pagina - 1) * paginacion;

const Docente = json => ({
    "noControl": json.DocenteNoControl,
    "titulo": json.DocenteTitulo,
    "nombre": json.DocenteNombre,
    "apellidoPaterno": json.DocenteApellidoPaterno,
    "apellidoMaterno": json.DocenteApellidoMaterno,
    "telefono": json.DocenteTelefono,
    "correoElectronico": json.DocenteCorreoElectronico
});

const buscar = parametros => conexion =>
      conexion.query(
          "SELECT DocenteNoControl, DocenteTitulo, DocenteNombre, DocenteApellidoPaterno, DocenteApellidoMaterno, DocenteTelefono, DocenteCorreoElectronico FROM Docente WHERE DocenteNoControl = ?",
          [
              parametros.noControl
          ]
      )
      .then(R.compose(R.head, R.map(Docente)));

const buscarTodos = parametros => conexion =>
      conexion.query(
          "SELECT DocenteNoControl, DocenteTitulo, DocenteNombre, DocenteApellidoPaterno, DocenteApellidoMaterno, DocenteTelefono, DocenteCorreoElectronico FROM Docente LIMIT ?, ?",
          [
              paginar(parametros.pagina),
              paginacion
          ]
      )
      .then(R.map(Docente));

const modificar = parametros => conexion =>
      conexion.query(
          "UPDATE Docente SET DocenteNoControl = ?, DocenteTitulo = ?, DocenteNombre = ?, DocenteApellidoPaterno = ?, DocenteApellidoMaterno = ?, DocenteTelefono = ?, DocenteCorreoElectronico = ? WHERE DocenteNoControl = ?",
          [
              parametros.nuevoNoControl,
              parametros.titulo,
              parametros.nombre,
              parametros.apellidoPaterno,
              parametros.apellidoMaterno,
              parametros.telefono,
              parametros.correoElectronico,
              parametros.noControl
          ]
      )
      .then(obtenerFilasAfectadas);

const crear = parametros => conexion =>
      conexion.query(
          "INSERT INTO Docente(DocenteNoControl, DocenteTitulo, DocenteNombre, DocenteApellidoPaterno, DocenteApellidoMaterno, DocenteTelefono, DocenteCorreoElectronico) VALUES(?, ?, ?, ?, ?, ?, ?)",
          [
              parametros.noControl,
              parametros.titulo,
              parametros.nombre,
              parametros.apellidoPaterno,
              parametros.apellidoMaterno,
              parametros.telefono,
              parametros.correoElectronico
          ]
      )
      .then(_ => ({ "noControl": parametros.noControl }));

const eliminar = parametros => conexion =>
      conexion.query(
          "DELETE FROM Docente WHERE DocenteNoControl = ?",
          [
              parametros.noControl
          ]
      )
      .then(obtenerFilasAfectadas);

module.exports = {
    "Docente": Docente,
    "buscar": buscar,
    "buscarTodos": buscarTodos,
    "modificar": modificar,
    "crear": crear,
    "eliminar": eliminar
}
