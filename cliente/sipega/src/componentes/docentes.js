import React, { Component } from "react";
import {
    Table,
    TableHeader,
    TableRow,
    TableHeaderColumn,
    TableBody,
    TableRowColumn,
    FloatingActionButton,
    Drawer,
    Dialog,
    TextField,
    RadioButtonGroup,
    RadioButton,
    FlatButton,
    Paper
} from "material-ui";
import ContentAdd from "material-ui/svg-icons/content/add";
import ActionDelete from "material-ui/svg-icons/action/delete";
import ImageEdit from "material-ui/svg-icons/image/edit";
import { Redirect, Link } from "react-router-dom";
import { httpGet, httpPost } from '../xmlhttp.js';
import Sesion from "./sesion.js";
import Plantilla from "./plantilla.js";
import ComprobanteSesion from "./comprobantesesion.js";

const estilos = {
    forma: {
        padding: 20
    },
    contenedor: {
        margin: "auto",
        marginTop: 30,
        padding: 30,
        width: 1200
    },
    contenedorAcciones: {
        position: "fixed",
        bottom: 20,
        right: 0
    },
    acciones: {
        marginRight: 20
    },
    alineado_derecha: {
        float: "right"
    }
};

class FormaDocente extends Component {
    render() {
        return (
            <form style={estilos.forma} onSubmit={this.props.onSubmit}>
              <TextField
                floatingLabelText="Número de control"
                hintText="Número de control"
                fullWidth={true}
                autoFocus={true}
                {... this.props.noControl}
                />
              <TextField
                floatingLabelText="Título"
                hintText="Título"
                fullWidth={true}
                {... this.props.titulo}
                />
              <TextField
                floatingLabelText="Nombre"
                hintText="Nombre"
                fullWidth={true}
                {... this.props.nombre}
                />
              <TextField
                floatingLabelText="Apellido paterno"
                hintText="Apellido paterno"
                fullWidth={true}
                {... this.props.apellidoPaterno}
                />
              <TextField
                floatingLabelText="Apellido materno"
                hintText="Apellido materno"
                fullWidth={true}
                {... this.props.apellidoMaterno}
                />
              <br/><br/>
              <TextField
                floatingLabelText="Teléfono"
                hintText="Teléfono"
                fullWidth={true}
                {... this.props.telefono}
                />
              <TextField
                floatingLabelText="Correo electrónico"
                hintText="Correo electrónico"
                fullWidth={true}
                {... this.props.correoElectronico}
                />
              <br/><br/>
              <FlatButton
                label="Cancelar"
                secondary={true}
                onClick={this.props.onCancel}
                />
              <FlatButton
                type="submit"
                label="Aceptar"
                primary={true}
                style={estilos.alineado_derecha}
                />
            </form>
        );
    }
}

const campos = {
    noControl: "Número de control",
    titulo: "Título",
    nombre: "Nombre",
    apellidoPaterno: "Apellido Paterno",
    apellidoMaterno: "Apellido Materno",
    telefono: "Teléfono",
    correoElectronico: "Correo electrónico"
};

/*const asesores = [
    {
        id: 16211959,
        titulo: "Ing. Sistemas Computacionales",
        nombre: "Daniel Santiago",
        apellidoPaterno: "Aguila",
        apellidoMaterno: "Torres",
        genero: "H",
        telefono: "0123456789",
        correoElectronico: "daniel.aguila16@tectijuana.edu.mx"
    },
    {
        id: 115467,
        titulo: "Ing. Sistemas Computacionales",
        nombre: "Brandon Steve",
        apellidoPaterno: "Cota",
        apellidoMaterno: "Armenta",
        genero: "H",
        telefono: "0123456789",
        correoElectronico: "brandon.cota16@tectijuana.edu.mx"
    }
];*/

class AgregarDocente extends Component {
    render() {
        return (
            <Dialog
              title="Agregar docente"
              modal={true}
              open={this.props.open}
              autoScrollBodyContent={true}
              >
              <FormaDocente onCancel={this.props.requestClose} onSubmit={this.enviar} />
            </Dialog>
        );
    }

    enviar = e => e.preventDefault();
}

class Docentes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            campos: campos,
            asesores: [],
            agregar: false,
            editar: false
        };
        this.cargar();
    }

    render() {
        return(
            <ComprobanteSesion>
              <Plantilla>
                <Paper style={estilos.contenedor}>
                  <Table
                    colSpan="3"
                    selectable={true}
                    multiSelectable={true}
                    fixedHeader={false}
                    style={{ width: "100%", tableLayout: "auto" }}
                    >
                    <TableHeader
                      displaySelectAll={true}
                      adjustForCheckbox={true}
                      enableSelectAll={true}
                      >
                      <TableRow>
                        <TableHeaderColumn>
                          <h1> Docentes </h1>
                        </TableHeaderColumn>
                      </TableRow>
                      <TableRow>
                        {Object.keys(this.state.campos).map(llave => this.state.campos[llave]).map(titulo => (
                            <TableHeaderColumn>{titulo}</TableHeaderColumn>
                        ))}
            </TableRow>
                </TableHeader>
                <TableBody
            displayRowCheckbox={true}
            deselectOnClickaway={false}
            showRowHover={false}
                >
                {this.state.asesores.map(entrada => (
                    <TableRow>
                      {Object.keys(entrada).map(llave => (
                          <TableRowColumn>{entrada[llave]}</TableRowColumn>
                      ))}
                    </TableRow>
                ))}
            </TableBody>
                </Table>
                </Paper>
                <div style={estilos.contenedorAcciones}>
                <FloatingActionButton
            style={estilos.acciones}
            onClick={this.abrirAgregar}
            secondary={true}
                >
                <ActionDelete />
                </FloatingActionButton>
                <FloatingActionButton
            style={estilos.acciones}
            onClick={this.abrirAgregar}
            secondary={true}
                >
                <ImageEdit />
                </FloatingActionButton>
                <FloatingActionButton
            style={estilos.acciones}
            onClick={this.abrirAgregar}
            primary={true}
                >
                <ContentAdd/>
                </FloatingActionButton>
                </div>
                <AgregarDocente
            open={this.state.agregar}
            requestClose={this.cerrarAgregar}
                />
            </Plantilla>
                </ComprobanteSesion>
        );
    }

    abrirAgregar = e => {
        this.setState({
            agregar: true
        });
    };

    cerrarAgregar = e => {
        this.setState({
            agregar: false
        });
    };

    actualizarEntrada = llave => evento => {
        const estado = {};
        estado[llave] = evento.target.value;
        this.setState(estado);
    }

    cargar() {
        Sesion.tokenCrudo()
            .then(token => httpGet("http://localhost:3002/docente/?pagina=1&token=" + token, {}))
            .then(JSON.parse)
            .then(json => {
                this.setState({
                    asesores: json
                });
            })
            .catch(error => {
                console.log(error);
                this.setState({
                    asesores: []
                });
            });
    }
}

export default Docentes;
