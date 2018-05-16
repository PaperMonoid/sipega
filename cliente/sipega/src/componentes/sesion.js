import React, { Component } from 'react';
import { httpGet, httpPost } from '../xmlhttp.js';

class Sesion {

    static token() {
        const token = localStorage.getItem("token");
        return httpGet("http://localhost:3001/token/" + token, {})
            .then(JSON.parse);
    }

    static iniciar(id, clave) {
        return httpPost("http://localhost:3001/token", {
            "id": id,
            "clave": clave
        })
            .then(JSON.parse)
            .then(json => {
                localStorage.setItem("token", json.token);
                return json;
            })
            .catch(error => {
                localStorage.removeItem("token");
                throw error;
            });
    }

    static terminar() {
        localStorage.removeItem("token");
        return Promise.resolve();
    }
}

Sesion.Activa = "Activa";
Sesion.Inactiva = "Inactiva";
Sesion.Carga = "Carga";

export default Sesion;
