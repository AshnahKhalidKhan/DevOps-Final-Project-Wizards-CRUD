import axios from "axios";

// const baseURL = "http://34.128.89.226:4000/wizards";
const baseURL = `${process.env.REACT_APP_API_URL}/wizards`;

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
