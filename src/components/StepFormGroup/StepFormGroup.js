import React from 'react';
import PropTypes from 'prop-types';
import styles from './StepFormGroup.module.css';

const StepFormGroup = ({step, id, handleChange}) => {
    return(
    <div className="form-group">
        <label>Krok {id+1}</label>
        <textarea data-id={id} name="step" value={step} className="form-control" onChange={handleChange}/>
    </div>)
};

StepFormGroup.propTypes = {};

StepFormGroup.defaultProps = {};

export default StepFormGroup;
