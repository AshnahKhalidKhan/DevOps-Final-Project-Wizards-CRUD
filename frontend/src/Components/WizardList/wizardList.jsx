import PropTypes from 'prop-types';
import WizardCard from "../WizardCard/wizardCard";
import './wizardList.css';

const WizardList = ({ wizards }) => (
  <div className="wizard-list-container">
    {wizards.map(wizard => (
      <WizardCard
        key={wizard.key}
        name={wizard.name}
        Age={wizard.Age}
        imgUrl={wizard.imgUrl}
        avatarUrl={wizard.avatarUrl}
      />
    ))}
  </div>
);

WizardList.propTypes = {
  wizards: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    Age: PropTypes.number.isRequired,
    imgUrl: PropTypes.string,
    avatarUrl: PropTypes.string
  })).isRequired
};

export default WizardList;
