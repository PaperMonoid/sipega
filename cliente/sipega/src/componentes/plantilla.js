import React, { Component } from 'react';
import Titulo from "./titulo.js";
import { Container } from "reactstrap";

class Plantilla extends Component {
    render() {
        return (
            <Container fluid={true}>
              <Titulo texto="SIPEGA"/>
              <br/><br/><br/>
              {
                  this.props.children
                      ? this.props.children
                      : null
              }
            </Container>
        );
    }
}

export default Plantilla;
