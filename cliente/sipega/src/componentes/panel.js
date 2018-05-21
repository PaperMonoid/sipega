import React, { Component } from "react";
import ComprobanteSesion from "./comprobantesesion.js";
import Plantilla from "./plantilla.js";
import {
    Paper,
    Subheader,
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
    AutoComplete
} from "material-ui";

const notificaciones = [
    { notificacion: "Actualizó de plan de estudios", grupo: "ABCDEF", materia: "Tópicos Avanzados de Programación", docente: "Ing. Daniel", fecha: "01-05-2018" },
    { notificacion: "Actualizó 2nda revisión", grupo: "FEDCBA", materia: "Fundamentos de Bases de Datos", docente: "Ing. Sofía", fecha: "01-05-2018" },
    { notificacion: "Creó plan de estudios", grupo: "ABCDEF", materia: "Tópicos Avanzados de Programación", docente: "Ing. Daniel", fecha: "15-04-2018" },
    { notificacion: "Actualizó 1ra revisión", grupo: "FEDCBA", materia: "Fundamentos de Bases de Datos", docente: "Ing. Sofía", fecha: "14-04-2018" },
    { notificacion: "Actualizó 1ra revisión", grupo: "ABCDEF", materia: "Tópicos Avanzados de Programación", docente: "Ing. Daniel", fecha: "13-03-2018" },
];

class Panel extends Component {

    constructor(props) {
        super(props);
        this.state = {
            notificaciones: notificaciones,
            autocompletar: notificaciones
        };
    }

    manejarEntrada = (value) => {
        this.setState({
            autocompletar: this.state.notificaciones
                .map(notificacion => notificacion.notificacion)
                .filter(texto => texto.startsWith(value)),
        });
    };

    render() {
        return (
            <ComprobanteSesion>
              <Plantilla>
                <Paper style={{margin: "auto", marginTop: 30, padding: 20, width: 1200}}>
                <Subheader>Notificaciones</Subheader>
                  <AutoComplete
                    floatingLabelText="Escribe algo"
                    hintText="Escribe algo"
                    dataSource={this.state.autocompletar}
                    onUpdateInput={this.manejarEntrada}
                    fullWidth={true}
                    />
                  <Table
                    fixedHeader={true}
                    selectable={true}
                    multiSelectable={true}
                    >
                    <TableHeader>
                      <TableRow>
                        <TableHeaderColumn>Notificación</TableHeaderColumn>
                        <TableHeaderColumn>Grupo</TableHeaderColumn>
                        <TableHeaderColumn>Materia</TableHeaderColumn>
                        <TableHeaderColumn>Docente</TableHeaderColumn>
                        <TableHeaderColumn>Fecha</TableHeaderColumn>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {this.state.notificaciones.map(notificacion => (
                          <TableRow>
                            <TableRowColumn>{notificacion.notificacion}</TableRowColumn>
                            <TableRowColumn>{notificacion.grupo}</TableRowColumn>
                            <TableRowColumn>{notificacion.materia}</TableRowColumn>
                            <TableRowColumn>{notificacion.docente}</TableRowColumn>
                            <TableRowColumn>{notificacion.fecha}</TableRowColumn>
                          </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Paper>
              </Plantilla>
            </ComprobanteSesion>
        );
    }
}

export default Panel;
