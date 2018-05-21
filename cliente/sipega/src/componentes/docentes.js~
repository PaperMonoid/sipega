import React, { Component } from "react";
import { Link } from "react-router-dom";
import Docente from "./docente.js";
import {
    Table, TableHeader, TableRow, TableHeaderColumn, TableRowColumn, TableBody
} from 'material-ui';

class Docentes extends Component {

    constructor(props) {
        super(props);
        this.state = {
            docentes: [
                {
                    "no control": 16211959,
                    "título": "Ing. en sistemas computacionales",
                    "nombre": "Juan",
                    "apellido paterno": "Perez",
                    "apellido materno": "Martinez",
                    "teléfono": "0123456789",
                    "correo electrónico": "asjhfsdjh@hotmail.com"
                },
                {
                    "no control": 16211959,
                    "título": "Ing. en sistemas computacionales",
                    "nombre": "Juan",
                    "apellido paterno": "Perez",
                    "apellido materno": "Martinez",
                    "teléfono": "0123456789",
                    "correo electrónico": "asjhfsdjh@hotmail.com"
                },
                {
                    "no control": 16211959,
                    "título": "Ing. en sistemas computacionales",
                    "nombre": "Juan",
                    "apellido paterno": "Perez",
                    "apellido materno": "Martinez",
                    "teléfono": "0123456789",
                    "correo electrónico": "asjhfsdjh@hotmail.com"
                }
            ]
        };
    }

    render() {
        return(
            <div>
              <Table
                height={this.state.height}
                fixedFooter={this.state.fixedFooter}
                selectable={this.state.selectable}
                multiSelectable={this.state.multiSelectable}
                fixedHeader={false} style={{ width: "100%", tableLayout: "auto" }}
                >
                <TableHeader
                  displaySelectAll={this.state.showCheckboxes}
                  adjustForCheckbox={this.state.showCheckboxes}
                  enableSelectAll={this.state.enableSelectAll}
                  >
                  <TableRow>
                    <TableHeaderColumn colSpan="3" tooltip="Super Header" style={{textAlign: 'center'}}>
                      Super Header
                    </TableHeaderColumn>
                  </TableRow>
                  <TableRow>
                    {Object.keys(this.state.docentes[0]).map(llave => (
                        <TableHeaderColumn tooltip={llave}>{llave}</TableHeaderColumn>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody
                  displayRowCheckbox={this.state.showCheckboxes}
                  deselectOnClickaway={this.state.deselectOnClickaway}
                  showRowHover={this.state.showRowHover}
                  stripedRows={this.state.stripedRows}
                  >
                {this.state.docentes.map(entrada => (
                    <TableRow>
                      {Object.keys(entrada).map(llave => (
                          <TableRowColumn>{entrada[llave]}</TableRowColumn>
                      ))}
                    </TableRow>
                ))}
            </TableBody>
                </Table>
                </div>
        );
    }

}

export default Docentes;
