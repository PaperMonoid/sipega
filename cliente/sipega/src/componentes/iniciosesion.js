import React, { Component } from 'react';
import { Progress, Alert, Container, Form, FormGroup, Button, Input, Label } from "reactstrap";
import { Link } from "react-router-dom";
import Sesion from "./sesion.js";
import Plantilla from "./plantilla.js";

function actualizarEntrada(objeto) {
    return propiedad => e => {
        const estado = {};
        estado[propiedad] = e.target.value;
        objeto.setState(estado);
    };
}

class InicioSesion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            clave: '',
            mostrarAlerta: false
        };
        this.actualizarEntrada = actualizarEntrada(this);
    }

    render() {
        return(
            <Plantilla>
              <Container
                className="border"
                style={{padding: "30px", width: "400px"}}>
                <Form onSubmit={e => this.iniciarSesion(e)}>
                  <h1> Inicio de sesión </h1>
                  <FormGroup>
                    <Label>ID de usuario</Label>
                    <Input autoFocus type="text" placeholder="ID de usuario"
                           value={this.state.id}
                           onChange={this.actualizarEntrada("id")}/>
                  </FormGroup>
                  <FormGroup>
                    <Label>Contraseña</Label>
                    <Input type="password" placeholder="Contraseña"
                           value={this.state.clave}
                           onChange={this.actualizarEntrada("clave")}/>
                  </FormGroup>
                  <Button className="float-right" color="primary">SIGUIENTE</Button>
                </Form>
                <Link to="/registro">
                  <Button className="float-left" color="link">
                    Nuevo usuario
                  </Button>
                </Link>
                <br/><br/>
                {
                    this.state.mostrarAlerta
                        ? (
                            <Alert color="danger">
                              No existe un usuario con esa contraseña.
                            </Alert>
                        )
                        : null
                }
            </Container>
                </Plantilla>
        );
    }

    iniciarSesion(e) {
        e.preventDefault();
        Sesion.iniciar(this.state.id, this.state.clave)
            .then(_ => {
                this.props.history.push('/');
            })
            .catch(_ => {
                this.setState({
                    "mostrarAlerta": true
                });
            });
    }
}

export default InicioSesion;
