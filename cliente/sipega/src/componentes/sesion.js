import React, { Component } from 'react';
import Titulo from './titulo.js';
import { httpPost } from '../xmlhttp.js';

class Registrado extends Component {
    render() {
        if (this.props.id == '') {
            return null;
        } else {
            return (
                <div class="alert alert-primary" role="alert">
                  El usuario {this.props.id} ha sido registrado.
                </div>
            );
        }
    }
}

class Registro extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            clave: ''
        };
    }

    render() {
        return(
            <div class="container-fluid">
              <Titulo texto="Registro" />
              <form>
                <div class="form-group">
                  <label>Contraseña</label>
                  <input autofocus="" class="form-control" type="password" placeholder="Contraseña" value={this.state.clave} onChange={evt => this.actualizarClave(evt)}/>
                  <small class="form-text text-muted">El usuario será asignado automáticamente.</small>
                </div>
                <Registrado id={this.state.id}/>
                <button class="btn btn-primary" onClick={evt => this.registrar(evt)}>Aceptar</button>
              </form>
            </div>
        );
    }

    registrar(evt) {
        evt.preventDefault();
        httpPost("http://localhost:3001/usuario", "clave=123")
            .then(console.log);
        this.setState({
            id: this.state.clave
        });
    }

    actualizarClave(evt) {
        this.setState({
            clave: evt.target.value
        });
    }
}

class InicioSesion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clave: ''
        };
    }

    render() {
        return(
            <div class="container-fluid">
              <Titulo texto="Inicio de sesión" />
              <form>
                <div class="form-group">
                  <label>Id de usuario</label>
                  <input autofocus="" class="form-control" type="numeric" placeholder="Id de usuario" value={this.state.id} onChange={evt => this.actualizarId(evt)}/>
                </div>
                <div class="form-group">
                  <label>Contraseña</label>
                  <input class="form-control" type="password" placeholder="Contraseña" value={this.state.clave} onChange={evt => this.actualizarClave(evt)}/>
                </div>
                <button class="btn btn-primary">Aceptar</button>
              </form>
            </div>
        );
    }

    actualizarClave(evt) {
        this.setState({
            clave: evt.target.value
        });
    }

    actualizarId(evt) {
        this.setState({
            id: evt.target.value
        });
    }
}

export {
    InicioSesion,
    Registro
};
