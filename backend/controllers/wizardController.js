import { wizardService } from '../services/wizardService.js';
import multer from 'multer';
import path from 'path';

export const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, './uploads'),
    filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});

export const upload = multer({ storage: storage });

export const getWizards = async (req, res) => {
    try {
        const wizards = await wizardService.getWizards();
        res.status(200).json(wizards);
    } catch (err) {
        res.status(500).json({ message: "Server error can't get all" });
    }
};

export const getOneWizard = async (req, res) => {
    try {
        const { id } = req.params;
        const wizard = await wizardService.getOneWizard(id);
        if (!wizard) {
            return res.status(404).json({ message: "Wizard not found, check id" });
        }
        res.status(200).json(wizard);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createWizard = async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'Image file is required' });
    }
    try {
        const wizard = await wizardService.createWizard(req.body, req.file.path);
        res.status(201).json({ message: 'Added Successfully', wizard });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateWizard = async (req, res) => {
    try {
        const { id } = req.params;
        const wizard = await wizardService.updateWizard(id, req.body);
        if (!wizard) {
            return res.status(404).json({ message: 'Wizard not found' });
        }
        res.status(200).json({ message: 'Wizard updated successfully', wizard });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteWizard = async (req, res) => {
    try {
        const { id } = req.params;
        const wizard = await wizardService.deleteWizard(id);
        if (!wizard) {
            return res.status(404).json({ message: 'Wizard not found' });
        }
        res.status(200).json({ message: 'Wizard deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
