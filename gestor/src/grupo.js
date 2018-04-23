exports.consultar = json => conexion => {
    const { noControl } = json
    return conexion.query(
        `SELECT * ` +
            `FROM Docente ` +
            `WHERE DocenteNoControl=${conexion.escape(noControl)}`
    )
}

exports.crear = json => conexion => {
    const {
        noControl,
        titulo,
        nombre,
        apellidoPaterno,
        apellidoMaterno,
        telefono,
        correoElectronico
    } = json
    return validar(/[A-Za-z0-9 ]{0,50}/)(descripcion)
        .then(_ => {
            return conexion.query(
                `INSERT INTO Docente(` +
                    `DocenteNoControl, ` +
                    `DocenteTitulo, ` +
                    `DocenteNombre, ` +
                    `DocenteApellidoPaterno, ` +
                    `DocenteApellidoMaterno, ` +
                    `DocenteTelefono, ` +
                    `DocenteCorreoElectronico` +
                    `) ` +
                    `VALUES(` +
                    `${conexion.escape(noControl)}, ` +
                    `${conexion.escape(titulo)}, ` +
                    `${conexion.escape(nombre)}, ` +
                    `${conexion.escape(apellidoPaterno)}, ` +
                    `${conexion.escape(apellidoMaterno)}, ` +
                    `${conexion.escape(telefono)}, ` +
                    `${conexion.escape(correoElectronico)} ` +
                    `)`
            )
        })
        .then(_ => {
            return noControl
        })
}


exports.modificar = json => conexion => {
    const {
        noControl,
        titulo,
        nombre,
        apellidoPaterno,
        apellidoMaterno,
        telefono,
        correoElectronico
    } = json
    return conexion.query(
        `UPDATE Docente ` +
            `SET ` +
            `DocenteNoControl=${conexion.escape(noControl)}, ` +
            `DocenteTitulo=${conexion.escape(titulo)}, ` +
            `DocenteNombre=${conexion.escape(nombre)}, ` +
            `DocenteApellidoPaterno=${conexion.escape(apellidoPaterno)}, ` +
            `DocenteApellidoMaterno=${conexion.escape(apellidoMaterno)}, ` +
            `DocenteTelefono=${conexion.escape(telefono)}, ` +
            `DocenteCorreoElectronico=${conexion.escape(correoElectronico)} ` +
            `WHERE DocenteNoControl=${conexion.escape(noControl)}`
    ).then(_ => {
        return noControl
    })
}

exports.borrar = json => conexion => {
    const { noControl } = json
    return conexion.query(
        `DELETE FROM Docente ` +
            `WHERE DocenteNoControl=${conexion.escape(noControl)}`
    ).then(resultado => {
        if (resultado.affectedRows > 0) {
            return noControl
        } else {
            throw Error('No se pudo eliminar')
        }
    })
}
