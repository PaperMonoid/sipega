import React, { Component } from 'react';

class Titulo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            texto: props.texto
        };
    }
    render() {
        return(
            <div class="navbar navbar-expand-lg navbar-light bg-light">
              <div class="navbar-brand">
                {this.props.texto}
              </div>
            </div>
        );
    }
}

export default Titulo;
