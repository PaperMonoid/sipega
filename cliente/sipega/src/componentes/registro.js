import React, { Component } from "react";
import {
    Dialog,
    Snackbar,
    Paper,
    TextField,
    FlatButton,
    RaisedButton
} from 'material-ui';
import { Redirect, Link } from "react-router-dom";
import { httpPost } from '../xmlhttp.js';
import Sesion from "./sesion.js";
import Plantilla from "./plantilla.js";

const estilos = {
    contenedor: {
        margin: 'auto',
        marginTop: 30,
        padding: 30,
        width: 400
    },
    alineado_derecha: {
        float: 'right'
    }
};

class Registro extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            clave: '',
            mostrarDialogo: false
        };
    }

    render() {
        return(
            <Plantilla>
              <Paper style={estilos.contenedor}>
                <form onSubmit={e => this.registrar(e)}>
                  <h1> Registro </h1>
                  <TextField
                    floatingLabelText="Contraseña"
                    hintText="Contraseña"
                    type="password"
                    fullWidth={true}
                    value={this.state.clave}
                    onChange={this.actualizarEntrada("clave")}
                    autoFocus={true}
                    />
                  <small>
                    El usuario será asignado automáticamente.
                  </small>
                  <br/><br/>
                  <Link to="/inicio-sesion">
                    <FlatButton label="Iniciar sesión" primary={true} />
                  </Link>
                  <RaisedButton label="Siguiente" type="submit" primary={true} style={estilos.alineado_derecha} />
                </form>
                <Dialog
                  actions={<FlatButton label="Aceptar" onClick={this.cerrarDialogo}/>}
                  modal={false}
                  open={this.state.mostrarDialogo}
                  onRequestClose={this.cerrarDialogo}
                  >
                  "El usuario no se pudo registrar."
                </Dialog>
              </Paper>
            </Plantilla>
        );
    }

    cerrarDialogo = click => {
        this.setState({
            mostrarDialogo: false
        });
    };

    actualizarEntrada = llave => evento => {
        const estado = {};
        estado[llave] = evento.target.value;
        this.setState(estado);
    }

    registrar(e) {
        e.preventDefault();
        httpPost("http://localhost:3001/usuario", {"clave": this.state.clave})
            .then(JSON.parse)
            .then(json => {
                return Sesion.iniciar(json.id, this.state.clave);
            })
            .then(json => {
                this.props.history.push('/');
            })
            .catch(error => {
                console.log(error);
                this.setState({
                    "mostrarDialogo": true
                });
            });
    }
}

export default Registro;
