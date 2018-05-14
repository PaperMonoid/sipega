const R = require("ramda");
const { obtenerIdInsertado, obtenerFilasAfectadas } = require("../bd.js");

const paginacion = 10;
const paginar = pagina => (pagina - 1) * paginacion;

const Grupo = json => ({
    "clave": json.GrupoClave,
    "noControl": json.GrupoDocenteNoControl,
    "materiaClave": json.GrupoMateriaClave,
    "semestre": json.GrupoSemestre
});

const buscar = parametros => conexion =>
      conexion.query(
          "SELECT GrupoClave, GrupoDocenteNoControl, GrupoMateriaClave, GrupoSemestre FROM Grupo WHERE GrupoClave = ?",
          [
              parametros.clave
          ]
      )
      .then(R.compose(R.head, R.map(Grupo)));

const buscarTodos = parametros => conexion =>
      conexion.query(
          "SELECT GrupoClave, GrupoDocenteNoControl, GrupoMateriaClave, GrupoSemestre FROM Grupo LIMIT ?, ?",
          [
              paginar(parametros.pagina),
              paginacion
          ]
      )
      .then(R.map(Grupo));

const modificar = parametros => conexion =>
      conexion.query(
          "UPDATE Grupo SET GrupoClave = ?, GrupoDocenteNoControl = ?, GrupoMateriaClave = ?, GrupoSemestre = ? WHERE GrupoClave = ?",
          [
              parametros.nuevaClave,
              parametros.noControl,
              parametros.materiaClave,
              parametros.semestre,
              parametros.clave
          ]
      )
      .then(obtenerFilasAfectadas);

const crear = parametros => conexion =>
      conexion.query(
          "INSERT INTO Grupo(GrupoClave, GrupoDocenteNoControl, GrupoMateriaClave, GrupoSemestre) VALUES(?, ?, ?, ?)",
          [
              parametros.clave,
              parametros.noControl,
              parametros.materiaClave,
              parametros.semestre
          ]
      )
      .then(_ => ({ "clave": parametros.clave }));

const eliminar = parametros => conexion =>
      conexion.query(
          "DELETE FROM Grupo WHERE GrupoClave = ?",
          [
              parametros.clave
          ]
      )
      .then(obtenerFilasAfectadas);

module.exports = {
    "Grupo": Grupo,
    "buscar": buscar,
    "buscarTodos": buscarTodos,
    "modificar": modificar,
    "crear": crear,
    "eliminar": eliminar
}
