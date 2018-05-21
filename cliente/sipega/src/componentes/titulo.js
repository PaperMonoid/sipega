import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { AppBar } from 'material-ui';
import Logo from "../imagenes/logo.png";

class Titulo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            texto: props.texto
        };
    }

    render() {
        return(
            <AppBar
              title={<img src={Logo} alt={this.state.texto} height="100%"/>}
              />
        );
    }
}

export default Titulo;
