import { useState, useEffect } from 'react';
import { getWizards } from '../service/api';
import WizardCard from './WizardCard'; // Assuming you have a WizardCard component

const WizardsList = () => {
  const [wizards, setWizards] = useState([]);

  useEffect(() => {
    const fetchWizards = async () => {
      const data = await getWizards();
      setWizards(data);
    };

    fetchWizards();
  }, []);

  // ... rest of your component

  return (
    <div>
      {wizards.map((wizard) => (
        <WizardCard 
          key={wizard.name} 
          wizard={wizard} 
        //   onEdit={/* Your edit logic */} 
        //   onDelete={/* Your delete logic */}
        />
      ))}
    </div>
  );
};

export default WizardsList;
