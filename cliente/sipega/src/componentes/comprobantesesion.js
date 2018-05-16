import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import { Progress } from "reactstrap";
import Sesion from "./sesion";

class ComprobanteSesion extends Component {

    constructor(props) {
        super(props);
        this.state = {
            sesion: Sesion.Carga,
            id: ''
        };
        Sesion.token()
            .then(json => {
                this.setState({
                    sesion: Sesion.Activa,
                    id: json.id
                });
            })
            .catch(error => {
                this.setState({
                    sesion: Sesion.Inactiva,
                    id: ''
                });
            });
    }

    render() {
        if (this.state.sesion == Sesion.Carga) {
            return (
                <Progress value="100" animated color="primary">
                  Cargando sesión...
                </Progress>
            );
        } else if (this.state.sesion == Sesion.Activa) {
            return this.props.children ? this.props.children : null;
        } else if (this.state.sesion == Sesion.Inactiva) {
            return (<Redirect to="/inicio-sesion"/>);
        } else {
            return null;
        }
    }
}

export default ComprobanteSesion;
