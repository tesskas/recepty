import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

class Home extends React.Component{
    constructor() {
        super();
        this.state = {
            message: null,
        }
        this.getJson();
    }

    async getJson(){
        fetch("/food")
            .then(async response => {
                const data = await response.json();
                console.log(data);
                const m = data.message;
                console.log(m);
                this.setState({message: m});
            });
    }

    render(){
        return (
            <div>
            <div className="container">
                <div className="row">
                    <div className="col-4">Polévky</div>
                    <div className="col-4">Hlavní jídla</div>
                    <div className="col-4">Dezerty</div>
                </div>
            </div>
            </div>
        );
    }
}

export default Home;
