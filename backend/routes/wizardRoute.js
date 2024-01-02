import express from 'express';
import { getWizards, createWizard, getOneWizard, deleteWizard, updateWizard } from '../controllers/wizardController.js';


const router = express.Router();

router.get('/', getWizards);

router.post('/', createWizard);

router.get('/:id', getOneWizard);

router.delete('/:id', deleteWizard);

router.patch('/:id', updateWizard);

export default router;