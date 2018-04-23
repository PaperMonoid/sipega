exports.consultar = json => conexion => {
    const { grupoClave } = json
    return conexion.query(
        `SELECT * ` +
            `FROM Grupo ` +
            `WHERE GrupoClave=${conexion.escape(grupoClave)}`
    )
}

exports.crear = json => conexion => {
    const {
        grupoClave,
        noControl,
        materiaClave,
        semestre
    } = json
    return conexion.query(
        `INSERT INTO Grupo(` +
            `GrupoClave, ` +
            `GrupoDocenteNoControl, ` +
            `GrupoMateriaClave, ` +
            `GrupoSemestre` +
            `) ` +
            `VALUES(` +
            `${conexion.escape(grupoClave)}, ` +
            `${conexion.escape(noControl)}, ` +
            `${conexion.escape(materiaClave)}, ` +
            `${conexion.escape(semestre)}` +
            `)`
    ).then(_ => {
        return materiaClave
    })
}

exports.modificar = json => conexion => {
    const {
        grupoClave,
        noControl,
        materiaClave,
        semestre
    } = json
    return conexion.query(
        `UPDATE Grupo ` +
            `SET ` +
            `GrupoClave=${conexion.escape(grupoClave)}, ` +
            `GrupoDocenteNoControl=${conexion.escape(noControl)}, ` +
            `GrupoMateriaClave=${conexion.escape(materiaClave)}, ` +
            `GrupoSemestre=${conexion.escape(semestre)} ` +
            `WHERE GrupoClave=${conexion.escape(grupoClave)}`
    ).then(_ => {
        return noControl
    })
}

exports.borrar = json => conexion => {
    const { grupoClave } = json
    return conexion.query(
        `DELETE FROM Grupo ` +
            `WHERE GrupoClave=${conexion.escape(grupoClave)}`
    ).then(resultado => {
        if (resultado.affectedRows > 0) {
            return grupoClave
        } else {
            throw Error('No se pudo eliminar')
        }
    })
}
