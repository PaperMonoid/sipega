const validar = regex => text =>
      new Promise((accept, reject) =>
                  (new RegExp(regex).test(text))
                  ? accept(text)
                  : reject(text))

exports.consultar = json => conexion => {
    const { usuarioId, privilegioId } = json
    return conexion.query(
        `SELECT * ` +
            `FROM Acceso ` +
            `WHERE AccesoPrivilegioId=${conexion.escape(privilegioId)} AND ` +
            `AccesoUsuarioId=${conexion.escape(usuarioId)} ` +
            `ORDER BY AccesoFechaCreacion DESC LIMIT 1`
    )
}

exports.asignar = json => conexion => {
    const { usuarioId, privilegioId, lectura, escritura, ejecucion } = json
    const validador = validar(/TRUE|FALSE/)
    return validador(lectura)
        .then(_ => validador(escritura))
        .then(_ => validador(ejecucion))
        .then(_ => {
            return conexion.query(
                `INSERT INTO Acceso(` +
                    `AccesoUsuarioId, ` +
                    `AccesoPrivilegioId, ` +
                    `AccesoLectura, ` +
                    `AccesoEscritura, ` +
                    `AccesoEjecucion, ` +
                    `AccesoFechaCreacion` +
                    `) ` +
                    `VALUES(` +
                    `${conexion.escape(usuarioId)}, ` +
                    `${conexion.escape(privilegioId)}, ` +
                    `${lectura}, ` +
                    `${escritura}, ` +
                    `${ejecucion}, ` +
                    `NOW()` +
                    `)`
            )
        }).then(resultado => {
            return resultado.insertId.toString()
        })
}
