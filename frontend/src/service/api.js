import axios from 'axios';
import { FRONTEND_IP } from '../../../constants/portConstants';

export const getWizards = async () => {
  try {
    const res = await axios.get(`${FRONTEND_IP}/wizards`);
    return res.data;
  } catch (error) {
    console.error("Error fetching wizards:", error);
    return []; // Return an empty array in case of error
  }
  
};

