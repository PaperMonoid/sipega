import React, { Component } from "react";
import Titulo from "./titulo.js";
import { Snackbar } from "material-ui";

class Plantilla extends Component {
    render() {
        return (
            <div>
              <Titulo texto="SIPEGA"/>
              {
                  this.props.children
                      ? this.props.children
                      : null
              }
              <Snackbar
                open={true}
                message="Esto es un demo y no representa la versión final."
                />
            </div>
        );
    }
}

export default Plantilla;
