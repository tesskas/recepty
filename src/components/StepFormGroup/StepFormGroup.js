import React from 'react';

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
