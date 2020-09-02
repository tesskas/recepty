import React from 'react';
import styles from './List.module.css';
import {Link} from "react-router-dom";
import {getByCategory, getFoods, removeFood} from "../../api";
import Filter from "../Filter/Filter";

class List extends React.Component{
    constructor(props) {
        super(props);

        this.handleRemove = this.handleRemove.bind(this);
        this.load = this.load.bind(this);
        this.update = this.update.bind(this);

        this.state = { foods: []}
        this.load();
    }

    load(){
        getFoods()
            .then(data => {
                return getByCategory(data, this.props.match.params.category);
            })
            .then( data => {
                this.setState({foods: data})
            });
    }

    handleRemove(e){
        removeFood(e.target.getAttribute("data-name"));
        this.load();
    }

    update(data){
        this.setState({foods: data})
    }

    componentDidUpdate(prevProps) {
        if (this.props.location !== prevProps.location) {
            this.load();
        }
    }

    render(){
        return(
            <div>
                <Filter category={["dezerty"]} update={this.update}/>
                <table className="table">
                    <thead className="thead-dark">
                    <tr>
                        <th scope="col">Název</th>
                        <th scope="col">Kategorie</th>
                        <th scope="col">Ingredience</th>
                        <th scope="col">Popis</th>
                        <th scope="col"></th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.foods != null &&
                        this.state.foods.map(f => {
                            return(
                                <tr>
                                    <td>{f.Name}</td>
                                    <td>{f.Category}</td>
                                    <td>
                                        <div className="ingredience-list">
                                            {
                                                f.Ingrediences != undefined &&
                                                f.Ingrediences.map(i => <label className={styles.ingredience + " btn-sm btn-info"}>{i.Name}</label>)
                                            }
                                        </div>
                                    </td>
                                    <td>{f.Description}</td>
                                    <td>
                                        <Link to={`/detail/${f.Name}`} className="btn btn-sm btn-outline-dark">Detail</Link>
                                        <button data-name={f.Name} className="btn btn-sm btn-danger" onClick={this.handleRemove}>Smazat</button>
                                    </td>
                                </tr>
                                );
                        })
                    }
                    </tbody>
                </table>
            </div>
        );
    }
}
export default List;
