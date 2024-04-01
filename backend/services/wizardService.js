import { Wizard } from '../models/wizard.js';
import path from 'path';
import { BACK_URL } from '../constants/constants.js';

const createWizard = async (newWiz, wizImgPath) => {
    const imagePath = `${BACK_URL}/uploads/${path.basename(wizImgPath)}`;
    const wizard = new Wizard({
        ...newWiz,
        imagePath
    });
    await wizard.save();
    return wizard;
};

const getWizards = async () => {
    const wizards = await Wizard.find({});
    return {
        count: wizards.length,
        data: wizards,
    };
};

const getOneWizard = async (id) => {
    const wizard = await Wizard.findById(id);
    return wizard;
};

const updateWizard = async (id, wizardData) => {
    const updatedWizard = await Wizard.findByIdAndUpdate(id, wizardData, { new: true });
    return updatedWizard;
};

const deleteWizard = async (id) => {
    const deletedWizard = await Wizard.findByIdAndDelete(id);
    return deletedWizard;
};

export const wizardService = {
    createWizard,
    getWizards,
    getOneWizard,
    updateWizard,
    deleteWizard,
};
