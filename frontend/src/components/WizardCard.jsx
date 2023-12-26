import React from 'react';
import PropTypes from 'prop-types';

const WizardCard = ({ wizard}) => {
  return (
    <div className="wizard-card">
      <h3>{wizard.name}</h3>
      <p>Age: {wizard.Age}</p> 
{/* 
      <button onClick={() => onEdit(wizard)}>Edit</button>

      <button onClick={() => onDelete(wizard)}>Delete</button> */}
    </div>
  );
};


WizardCard.propTypes = {
    wizard: PropTypes.shape({
      name: PropTypes.string.isRequired,
      Age: PropTypes.number, 
    }).isRequired,
    // onEdit: PropTypes.func.isRequired,
    // onDelete: PropTypes.func.isRequired,
  };

export default WizardCard;