import React from 'react';
import styles from './Form.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPlus, faMinus} from "@fortawesome/free-solid-svg-icons";
import IngredienceFormGroup from "../IngredienceFormGroup/IngredienceFormGroup";
import StepFormGroup from "../StepFormGroup/StepFormGroup";
import {Redirect} from "react-router-dom";
import {parse} from "@fortawesome/fontawesome-svg-core";

class Form extends React.Component{
    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeIngredience = this.handleChangeIngredience.bind(this);
        this.handleChangeStep = this.handleChangeStep.bind(this);
        this.addIngredienceField = this.addIngredienceField.bind(this);
        this.removeIngredienceField = this.removeIngredienceField.bind(this);
        this.addStepField = this.addStepField.bind(this);
        this.removeStepField = this.removeStepField.bind(this);

        if(this.props.match.path.includes("edit")){
            var obj = JSON.parse(localStorage.getItem("detail"));
            this.state = {
                food: {
                    name: obj.Name,
                    category: obj.Category,
                    description: obj.Description,
                    ingrediences:  obj.Ingrediences != null ? obj.Ingrediences : [],
                    steps: obj.Steps != null ? obj.Steps : []
                }
            };
        }
        else
            this.state = {
                food: {
                    name: "",
                    category: "",
                    description: "",
                    ingrediences:  [],
                    steps: []
                }
            };
    }

    handleSubmit(e) {
        e.preventDefault();
        this.setState({ message: 'Sending...' }, this.sendFormData(false));
        this.props.history.push('/list')
    }
    handleSave(e){
        e.preventDefault();
        this.setState({ message: 'Sending...' }, this.sendFormData(true));
        this.props.history.push('/list')
    }
    handleChange(e){
        console.log(e.target.name);
        let f = this.state.food;
        f[e.target.name] = e.target.value;
        this.setState({food: f});
    }
    handleChangeIngredience(e){
        let f = this.state.food;
        let id = parseInt(e.target.getAttribute("data-id"));
        f.ingrediences[id][e.target.name] = e.target.value;
        this.setState({food: f});
    }
    handleChangeStep(e){
        let f = this.state.food;
        let id = parseInt(e.target.getAttribute("data-id"));
        f.steps[id]["Desc"] = e.target.value;
        this.setState({food: f});
    }

    addIngredienceField(e) {
        let f = this.state.food;
        f.ingrediences.push({name: "", amount:"", unit: ""});
        this.setState({food: f});
    }
    removeIngredienceField(e){
        console.log(e.target.id);
        let f = this.state.food;
        f.ingrediences.splice(parseInt(e.target.id), 1);
        this.setState({food: f});
    }

    addStepField(e){
        let f = this.state.food;
        f.steps.push({desc:""});
        this.setState({food: f});
    }
    removeStepField(e){
        let f = this.state.food;
        f.steps.pop();
        this.setState({food: f});
    }

    sendFormData(exist) {
        setTimeout(async () => {
            this.setState({ message: 'data sent!' });
            let obj = JSON.stringify(this.state.food);
            console.log("BODY: " + obj)
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: obj
            };
            let response = exist? await fetch("/update", requestOptions) :  await fetch("/add", requestOptions);
            let data = await response.json()
            return data;
        }, 3000);
    }

    render(){
        let ingredience = [], steps = [];
        if(this.state.food.ingrediences != undefined)
            ingredience = this.state.food.ingrediences.map( (i,x) =>
                <IngredienceFormGroup ingredience={i} index={x.toString()} remove={this.removeIngredienceField} handleChange={this.handleChangeIngredience}/>
                );
        if(this.state.food.steps != undefined)
            steps = this.state.food.steps.map((s,i) => { return(<StepFormGroup step={s.Desc} id={i} handleChange={this.handleChangeStep}/>)});

        return(
        <div>
                <div className="form-group row">
                    <label className="col-2">Název</label>
                    <div className="col-10">
                        <input type="text" className="form-control" name="Name" onChange={this.handleChange} value={this.state.food.name}/>
                    </div>
                </div>

                <fieldset className="form-group">
                    <div className="row">
                        <legend className="col-form-label col-sm-2 pt-0">Radios</legend>
                        <div className="col-sm-10">
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="Category" value="polévka"  onChange={this.handleChange}
                                       checked={this.state.food.category === "polévka"}/>
                                <label className="form-check-label">Polévka</label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="Category" value="hlavní"  onChange={this.handleChange}
                                       checked={this.state.food.category === "hlavní"}/>
                                <label className="form-check-label">Hlavní chod</label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="Category" value="dezert" onChange={this.handleChange}
                                       checked={this.state.food.category === "dezert"}/>
                                <label className="form-check-label">Dezert</label>
                            </div>
                        </div>
                    </div>
                </fieldset>

                <div className="form-group row">
                    <label className="col-2">Popis</label>
                    <div className="col-10">
                        <input type="text" className="form-control" name="Description" onChange={this.handleChange} value={this.state.food.description}/>
                    </div>
                </div>

                <div className="row">
                    <div className="col-5">
                        <h3>Ingredience:</h3>
                        {ingredience}
                        <button className="btn btn-success row" onClick={this.addIngredienceField}>
                            <FontAwesomeIcon icon={faPlus} />
                        </button>
                    </div>
                    <div className="col-7">
                        <h3>Postup:</h3>
                        {steps}
                        <div className="form-group">
                            <button className="btn btn-danger" onClick={this.removeStepField}>
                                <FontAwesomeIcon icon={faMinus} />
                            </button>
                            <button className="btn btn-success" onClick={this.addStepField}>
                                <FontAwesomeIcon icon={faPlus} />
                            </button>
                        </div>
                    </div>
                </div>
            {this.props.match.path.includes("edit") ?
                <button type="submit" className="btn btn-primary" onClick={this.handleSave}>Uložit</button>
                :
                <button type="submit" className="btn btn-primary" onClick={this.handleSubmit}>Vytvořit</button>
            }
        </div>
        );
    }
}

export default Form;
