import React, { Component } from "react";
import {
    Card,
    CardTitle,
    CardHeader,
    CardText,
    List,
    ListItem
} from 'material-ui';
import { Link } from "react-router-dom";

class Docente extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return(
            <Card>
              <CardTitle
                title={`${this.props.datos.nombre} ${this.props.datos.apellidoPaterno} ${this.props.datos.apellidoMaterno}`}
                subtitle={this.props.datos.titulo}
                >
              </CardTitle>
              <CardText>
                <small>Datos:</small>
                <List>
                  <ListItem>Teléfono: {this.props.datos.telefono}</ListItem>
                  <ListItem>Correo Electrónico: {this.props.datos.correoElectronico}</ListItem>
                </List>
              </CardText>
            </Card>
        );
    }
}

export default Docente;
