import React, { Component } from "react";
import {
    Dialog,
    Snackbar,
    Paper,
    TextField,
    FlatButton,
    RaisedButton
} from 'material-ui';
import { Link } from "react-router-dom";
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

class InicioSesion extends Component {
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
                <form onSubmit={e => this.iniciarSesion(e)}>
                  <h1> Inicio de sesión </h1>
                  <TextField
                    floatingLabelText="ID de usuario"
                    hintText="ID de usuario"
                    fullWidth={true}
                    value={this.state.id}
                    onChange={this.actualizarEntrada("id")}
                    autoFocus={true}
                    />
                  <TextField
                    floatingLabelText="Contraseña"
                    hintText="Contraseña"
                    type="password"
                    fullWidth={true}
                    value={this.state.clave}
                    onChange={this.actualizarEntrada("clave")}
                    />
                  <br/><br/>
                  <Link to="/registro">
                    <FlatButton label="Nuevo usuario" primary={true} />
                  </Link>
                  <RaisedButton label="Siguiente" type="submit" primary={true} style={estilos.alineado_derecha}/>
                </form>
                <Dialog
                  actions={<FlatButton label="Aceptar" onClick={this.cerrarDialogo}/>}
                  modal={false}
                  open={this.state.mostrarDialogo}
                  onRequestClose={this.cerrarDialogo}
                  >
                  "No existe un usuario con esa contraseña."
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

    iniciarSesion(e) {
        e.preventDefault();
        Sesion.iniciar(this.state.id, this.state.clave)
            .then(_ => {
                this.props.history.push('/');
            })
            .catch(_ => {
                this.setState({
                    mostrarDialogo: true
                });
            });
    }
}

export default InicioSesion;
