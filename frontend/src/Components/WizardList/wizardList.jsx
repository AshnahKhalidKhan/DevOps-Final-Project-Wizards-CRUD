import PropTypes from 'prop-types';
import WizardCard from "../WizardCard/wizardCard";
import './wizardList.css';

const WizardList = ({ wizards, onEdit, onDelete, onView }) => (
  <div className="wizard-list-container">
    {wizards.map(wizard => (
      <WizardCard
        key={wizard._id}
        name={wizard.name}
        Age={wizard.age}
        imagePath={wizard.imagePath}
        onEdit={() => onEdit(wizard)}
        onDelete={() => onDelete(wizard._id)}
        onView={() => onView(wizard)}
      />
    ))}
  </div>
);

WizardList.propTypes = {
  wizards: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    age: PropTypes.number.isRequired,
    imagePath: PropTypes.string,
  })).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onView: PropTypes.func.isRequired

};

export default WizardList;
