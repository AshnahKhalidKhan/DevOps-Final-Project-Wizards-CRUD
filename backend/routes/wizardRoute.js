import express from 'express';
import { getWizards, createWizard, getOneWizard, deleteWizard, updateWizard, upload } from '../controllers/wizardController.js';


const router = express.Router();

router.get('/', getWizards);

router.post('/', upload.single('imagePath'), createWizard);

router.get('/:id', getOneWizard);

router.delete('/:id', deleteWizard);

router.patch('/:id', updateWizard);

export default router;