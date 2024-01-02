import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import WizardList from './Components/WizardList/wizardList';

function App() {
  const [wizards, setWizards] = useState([]);

  useEffect(() => {
    // Replace '/api/wizards' with your actual backend endpoint
    axios.get('http://localhost:5000/wizards')
      .then(response => {
        setWizards(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the wizards!', error);
      });
  }, []);

  const createWizard = () => {
    // Replace with your logic to create a new wizard
    console.log('Creating a new wizard');
  };

  return (
    <>
      <h1>CRUD APIs using axios and express</h1>
   
        <button onClick={createWizard}>
          Create new Wizard
        </button>
        <WizardList wizards={wizards} />

    </>
  );
}

export default App;
