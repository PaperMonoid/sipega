import React from 'react';
import ReactDOM from 'react-dom';
//import './index.css';

class IniciarSesion extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'usuarioId': '',
            'clave': ''
        };
    }

    enviar() {
        fetch("http://localhost:3001/usuario/1", { 'method': 'GET'})
            .then(s => alert(s));
    }

    render () {
        return <div>
            <div>
            <span>UsuarioId: </span>
            <input type="text" onChange={this.asignarEvento('usuarioId')}/>
            </div>
            <div>
            <span>Contraseña: </span>
            <input type="password" onChange={this.asignarEvento('clave')}/>
            </div>
            <div>
            <input type="submit" value="Iniciar sesión" onClick={() => this.enviar()}/>
            </div>
            </div>;
    }

    asignarEvento(llave) {
        return function(evento) {
            const json = {};
            json[llave] = evento.target.value;
            return this.setState(json);
        }.bind(this);
    }
}

function Registrarse() {
    return <div>
        <div>
        <span>UsuarioId: </span>
        <input type="text"/>
        </div>
        <div>
        <span>Contraseña: </span>
        <input type="password"/>
        </div>
        <div>
        <input type="submit" value="Registrarse"/>
        </div>
        </div>;
}

class Sitio extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'sesion': <IniciarSesion/>
        };
    }

    render() {
        return this.state.sesion;
    }
}

function Sitio() {
    return <IniciarSesion/>;
}

ReactDOM.render(<Sitio/>, document.getElementById("root"));
