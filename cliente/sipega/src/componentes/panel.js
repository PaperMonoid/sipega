import React, { Component } from 'react';
import ComprobanteSesion from "./comprobantesesion.js";
import Plantilla from "./plantilla.js";

class Panel extends Component {
    render() {
        return (
            <ComprobanteSesion>
              <Plantilla>
                Pantalla principal
              </Plantilla>
            </ComprobanteSesion>
        );
    }
}

export default Panel;
