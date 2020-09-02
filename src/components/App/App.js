import React from 'react';
import List from "../List/List";
import {callApi, parse} from '../../api';
import Form from "../Form/Form";
import Detail from "../Detail/Detail";
import 'bootstrap/dist/css/bootstrap.min.css';

import {
    BrowserRouter as Router,
    Link,
    Route,
    Switch,
} from 'react-router-dom';

class App extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            foods: [],
            go: ""
        }
        callApi("/").then(data => {this.setState({go: parse(data)})})
    }

    render(){
        return(
            <Router>
                <h1>{this.state.go}</h1>
                <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample03"
                            aria-controls="navbarsExample03" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarsExample03">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <Link className="nav-link" to="/list/polevka">Polévky</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/list/hlavní">Hlavní chody</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/list/dezerty">Dezerty</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/add">Vytvořit nový</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/list">Seznam</Link>
                            </li>
                        </ul>
                    </div>
                </nav>

                <div className="container mt-5">
                    <Switch>
                        <Route path="/add" component={Form} />
                        <Route path="/edit/:name" component={Form} />
                        <Route path="/list/:category" component={List}/>
                        <Route path="/detail/:name" component={Detail}/>
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default App;
