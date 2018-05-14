import React, { Component } from 'react';
import Titulo from './titulo.js';

class Registro extends Component {
    constructor(props) {
        super(props);
        this.state = {
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
}

export default Registro;
