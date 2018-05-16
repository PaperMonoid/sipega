import React, { Component } from 'react';
import { Navbar, NavbarBrand, Button } from "reactstrap";
import { Link } from "react-router-dom";

class Titulo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            texto: props.texto
        };
    }
    render() {
        return(
            <Navbar fixed="top" color="light">
              <Link to="/">
                <NavbarBrand>
                  {this.props.texto}
                </NavbarBrand>
              </Link>
            </Navbar>
        );
    }
}

export default Titulo;
