import React from 'react';
import {getDetail} from "../../api";
import {Link} from "react-router-dom";

class Detail extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            food: {}
        }
        this.load = this.load.bind(this);
        this.load();
    }

    load(){
        getDetail(this.props.match.params.name).then(data =>{
                this.setState({food: data});
                localStorage.setItem("detail", JSON.stringify(data));
        })
    }

    render(){
        return(
          <div>
              <h1>{this.state.food.Name}</h1>
              <h3>{this.state.food.Category}</h3>
              <p>{this.state.food.Description}</p>
              <ul>
                  {
                      this.state.food.ingrediences !== undefined &&
                      this.state.food.ingrediences.map(i =>
                        <li>i.name</li>
                      )
                  }
              </ul>
              <ul>
                  {
                      this.state.food.steps !== undefined &&
                      this.state.food.steps.map(s =>
                          <li>s</li>
                      )
                  }
              </ul>
              <Link to={`/edit/${this.state.food.Name}`} className="btn btn-sm btn-outline-dark">Upravit</Link>
          </div>
        );
    }
}

export default Detail;
