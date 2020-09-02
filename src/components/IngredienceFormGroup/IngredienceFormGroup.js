import React from 'react';
import PropTypes from 'prop-types';
import styles from './IngredienceFormGroup.module.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes} from "@fortawesome/free-solid-svg-icons";

const IngredienceFormGroup = ({ingredience, index, remove, handleChange}) => {
    return(
    <div className="form-group row">
        <input type="text" className="form-control col-4" placeholder="název" data-id={index} name="Name" value={ingredience.Name} onChange={handleChange}/>
        <input type="text" className="form-control col-3" placeholder="množství" data-id={index} name="Amount" value={ingredience.Amount} onChange={handleChange}/>
        <select className="form-control col-2" data-id={index} name="Unit" onChange={handleChange} value={ingredience.Unit}>
            <option></option>
            <option>g</option>
            <option>ks</option>
            <option>ml</option>
            <option>dl</option>
            <option>l</option>
            <option>balíček</option>
            <option>lžíce</option>
            <option>lžička</option>
        </select>
        <button id={index} className="btn-sm btn-danger" onClick={remove}><FontAwesomeIcon id={index} icon={faTimes}/></button>
    </div>
    )
};

IngredienceFormGroup.propTypes = {};

IngredienceFormGroup.defaultProps = {};

export default IngredienceFormGroup;
