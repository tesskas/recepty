import React from 'react';
import styles from './FilterItem.module.css';
import {getByCategory, getByName, getByIngredience, getFoods} from "../../api";

class FilterItem extends React.Component{
    constructor(props) {
        super(props);
        this.choice = React.createRef();
        this.area = React.createRef();
        this.showChoice = this.showChoice.bind(this);
        this.hideChoice = this.hideChoice.bind(this);
        this.filter = this.filter.bind(this);
    }

    /*componentDidMount() {
        document.addEventListener('mouseover', (e) => {
            if(this.area && !this.area.current.contains(e.target))
                this.hideChoice(e);
        });
    }*/

    showChoice(e){
        const classlist = this.choice.current.classList
        if(classlist.contains("invisible"))
            classlist.remove("invisible");
        else
            this.hideChoice(e);
    }

    hideChoice(e){
        this.filter(e);
        this.choice.current.classList.add("invisible");
    }

    filter(e){
        let f = document.getElementsByClassName("filter");
        let category, ingredience, name = null;
        category = Array.prototype.slice.call(f[0].getElementsByTagName("input")).filter(e => e.checked).map(e => e.getAttribute("data-name"));
        ingredience = Array.prototype.slice.call(f[1].getElementsByTagName("input")).filter(e => e.checked).map(e => e.getAttribute("data-name"));
        getFoods().then(data => {
            if (name !== null)
                data = getByName(data, name);
            if (category !== null)
                data = getByCategory(data, category);
            if (ingredience !== null)
                data = getByIngredience(data, ingredience);
            this.props.update(data);
            return data;
        })
    }

    render() {
        return (
            <div ref={this.area}>
                <input type="text" placeholder={this.props.name} onClick={this.showChoice}/>
                    <div id="filter" className={styles.choice + " invisible filter"} ref={this.choice}>
                        {
                            this.props.list !== null &&
                            this.props.list.map(item => {
                                return(
                                    <div className="form-check">
                                        <input data-name={item} type="checkbox" className="form-check-input" onChange={this.filter}/>
                                        <label className="form-check-label">{item}</label>
                                    </div>
                                );
                            })
                        }

                        <button className="btn btn-sm btn-outline-success float-right" onClick={this.hideChoice}>Zobrazit</button>
                    </div>
            </div>
        );
    }
}

export default FilterItem;
