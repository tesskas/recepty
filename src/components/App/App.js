import React from 'react';
import List from "../List/List";
import Form from "../Form/Form";
import Detail from "../Detail/Detail";
import {BrowserRouter as Router, Link, Switch, Route, HashRouter} from 'react-router-dom';

class App extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            foods: []
        }
    }

    render(){
        return(
            <HashRouter basename="/">
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
                        </ul>
                    </div>
                </nav>

                <div className="container mt-5">
                    <Switch>
                        <Route path="/add" component={Form} />
                        <Route path="/edit/:name" component={Form} />
                        <Route exact path="/list/:category" component={List}/>
                        <Route path="/detail/:name" component={Detail}/>
                    </Switch>
                </div>
            </HashRouter>
        );
    }
}

export default App;
