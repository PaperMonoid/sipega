import React, { Component } from 'react';
import Titulo from "./componentes/titulo.js";
import Panel from "./componentes/panel.js";
import Registro from "./componentes/registro.js";
import InicioSesion from "./componentes/iniciosesion.js";
import Docentes from "./componentes/docentes.js";
import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch
} from "react-router-dom";

class App extends Component {

    render() {
        return (
            <Router>
              <Switch>
                <Route exact path="/" component={Panel} />
                <Route path="/docentes" component={Docentes} />
                <Route path="/inicio-sesion" component={InicioSesion} />
                <Route path="/registro" component={Registro} />
              </Switch>
            </Router>
        );
    }

}

/*
  import logo from './logo.svg';
  import './App.css';
  <div className="App">
  <header className="App-header">
  <img src={logo} className="App-logo" alt="logo" />
  <h1 className="App-title">Welcome to React</h1>
  </header>
  <p className="App-intro">
  To get started, edit <code>src/App.js</code> and save to reload.
  </p>
  </div>
*/

export default App;
