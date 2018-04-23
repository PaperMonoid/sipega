exports.consultar = json => conexion => {
    const { materiaClave } = json
    return conexion.query(
        `SELECT * ` +
            `FROM Materia ` +
            `WHERE MateriaClave=${conexion.escape(materiaClave)}`
    )
}

exports.crear = json => conexion => {
    const {
        materiaClave,
        nombre,
        nombreAbreviado
    } = json
    return conexion.query(
        `INSERT INTO Materia(` +
            `MateriaClave, ` +
            `MateriaNombre, ` +
            `MateriaNombreAbreviado` +
            `) ` +
            `VALUES(` +
            `${conexion.escape(materiaClave)}, ` +
            `${conexion.escape(nombre)}, ` +
            `${conexion.escape(nombreAbreviado)}` +
            `)`
    ).then(_ => {
        return materiaClave
    })
}

exports.modificar = json => conexion => {
    const {
        materiaClave,
        nombre,
        nombreAbreviado
    } = json
    return conexion.query(
        `UPDATE Materia ` +
            `SET ` +
            `MateriaClave=${conexion.escape(materiaClave)}, ` +
            `MateriaNombre=${conexion.escape(nombre)}, ` +
            `MateriaNombreAbreviado=${conexion.escape(nombreAbreviado)} ` +
            `WHERE MateriaClave=${conexion.escape(materiaClave)}`
    ).then(_ => {
        return materiaClave
    })
}

exports.borrar = json => conexion => {
    const { materiaClave } = json
    return conexion.query(
        `DELETE FROM Materia ` +
            `WHERE MateriaClave=${conexion.escape(materiaClave)}`
    ).then(resultado => {
        if (resultado.affectedRows > 0) {
            return materiaClave
        } else {
            throw Error('No se pudo eliminar')
        }
    })
}
