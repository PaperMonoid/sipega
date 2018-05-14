const crypto = require('crypto');

const cifrarClave = clave =>
      crypto.createHmac("sha256", clave).digest("hex");

module.exports = {
    "cifrarClave": cifrarClave
};
