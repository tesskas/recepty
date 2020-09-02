import React from 'react';
import PropTypes from 'prop-types';
import styles from './Filter.module.css';
import FilterItem from "../FilterItem/FilterItem";
import {getFilterList} from "../../api";

class Filter extends React.Component{
    constructor(props){
        super(props);
        //this.categories = React.createRef();
        //this.ingrediences = React.createRef();
        this.load = this.load.bind(this);
        this.state = {
            categories: this.props.category,
            ingrediences: []
        }
        this.load();
    }

    load(){
        getFilterList("category").then( data => this.setState({categories: data}));
        getFilterList("ingredience").then( data => this.setState({ingrediences: data}));
    }

    render(){
        return(
            <div className="my-5">
                <div className="row">
                    <div className="col-3">
                        <input type="text" placeholder="Název"/>
                    </div>
                    <div className="col-3">
                        <FilterItem list={this.state.categories} update={this.props.update} name="Kategorie"/>
                    </div>
                    <div className="col-3">
                        <FilterItem list={this.state.ingrediences} update={this.props.update} name="Ingredience"/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-3">
                        <button className="btn btn-sm btn-success mt-3" onClick={this.props.search}>Vyhledat</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Filter;
