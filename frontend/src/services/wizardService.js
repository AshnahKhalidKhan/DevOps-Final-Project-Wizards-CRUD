import axios from "axios";

const baseURL = "http://localhost:5000/wizards";

export const fetchWizards = async () => {
  const response = await axios.get(baseURL);
  return response.data.data;
};

export const createWizard = async (formData) => {
  const response = await axios.post(baseURL, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  return response.data;
};

export const updateWizard = async (id, formData) => {
  const response = await axios.patch(`${baseURL}/${id}`, formData);
  return response.data;
};

export const deleteWizard = async (id) => {
  const response = await axios.delete(`${baseURL}/${id}`);
  return response.data;
};
