const crypto = require('crypto')

exports.consultar = json => conexion => {
    const { usuarioId } = json
    return conexion.query(
        `SELECT * ` +
            `FROM Usuario ` +
            `WHERE UsuarioId=${conexion.escape(usuarioId)}`
    )
}

exports.crear = json => conexion => {
    const { clave } = json
    const hash = crypto.createHmac('sha256', clave).digest('hex')
    return conexion.query(
        `INSERT INTO Usuario(UsuarioClave, UsuarioFechaCreacion) ` +
            `VALUES(${conexion.escape(hash)}, NOW())`
    ).then(resultado => {
        return resultado.insertId.toString()
    })
}

exports.borrar = json => conexion => {
    const { usuarioId } = json
    return conexion.query(
        `DELETE FROM Usuario ` +
            `WHERE UsuarioId=${conexion.escape(usuarioId)}`
    ).then(resultado => {
        if (resultado.affectedRows > 0) {
            return usuarioId.toString()
        } else {
            throw Error('No se pudo eliminar')
        }
    })
}
