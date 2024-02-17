import { useState, useEffect } from "react";
import * as wizardService from "../services/wizardService";

export const useWizards = () => {
  const [wizards, setWizards] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const data = await wizardService.fetchWizards();
      setWizards(data);
    };
    fetch();
  }, []);

  const addWizard = async (formData) => {
    await wizardService.createWizard(formData);
    const updatedWizards = await wizardService.fetchWizards();
    setWizards(updatedWizards);
  };

  const editWizard = async (id, formData) => {
    await wizardService.updateWizard(id, formData);
    const updatedWizards = await wizardService.fetchWizards();
    setWizards(updatedWizards);
  };

  const removeWizard = async (id) => {
    await wizardService.deleteWizard(id);
    const updatedWizards = await wizardService.fetchWizards();
    setWizards(updatedWizards);
  };

  return {
    wizards,
    addWizard,
    editWizard,
    removeWizard,
  };
};
