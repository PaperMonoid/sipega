const { sign, verify } = require('jsonwebtoken');

const minuto = 60;
const hora = 60 * minuto;
const dia = 24 * hora;
const horaActual = () => Math.floor(Date.now() / 1000);
const enUnMinuto = () => horaActual() + minuto;
const enCincoMinutos = () => horaActual() + 5 * minuto;
const enUnaHora = () => horaActual() + hora;

const obtener = parametros => ({
    "token": sign(
        {
            "id": parametros["id"],
            "exp": enUnaHora()
        },
        process.env.SECRETO_SIPEGA
    )
});

const verificar = token =>
      verify(token, process.env.SECRETO_SIPEGA);

module.exports = {
    "obtener": obtener,
    "verificar": verificar
};
