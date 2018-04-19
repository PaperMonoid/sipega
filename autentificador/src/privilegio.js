const validar = regex => text =>
      new Promise((accept, reject) =>
                  (new RegExp(regex).test(text))
                  ? accept(text)
                  : reject(text))

exports.consultar = json => conexion => {
    const { privilegioId } = json
    return conexion.query(
        `SELECT * ` +
            `FROM Privilegio ` +
            `WHERE PrivilegioId=${conexion.escape(privilegioId)}`
    )
}

exports.crear = json => conexion => {
    const { descripcion } = json
    return validar(/[A-Za-z0-9 ]{0,50}/)(descripcion)
        .then(_ => {
            return conexion.query(
                `INSERT INTO Privilegio(PrivilegioDescripcion) ` +
                    `VALUES(${conexion.escape(descripcion)})`
            )
        })
        .then(resultado => {
            return resultado.insertId.toString()
        })
}

exports.borrar = json => conexion => {
    const { privilegioId } = json
    return conexion.query(
        `DELETE FROM Privilegio ` +
            `WHERE PrivilegioId=${conexion.escape(privilegioId)}`
    ).then(resultado => {
        if (resultado.affectedRows > 0) {
            return privilegioId.toString()
        } else {
            throw Error('No se pudo eliminar')
        }
    })
}
