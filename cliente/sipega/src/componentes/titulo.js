import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { AppBar } from 'material-ui';

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
                title={this.props.texto}
                />
        );
    }
}

export default Titulo;
