import express from 'express';

import { getWizards, createWizard, getOneWizard, deleteWizard, updateWizard } from '../controllers/wizardController.js';

const router = express.Router();

router.get('/', getWizards);

router.post('/', createWizard);

router.get('/:name', getOneWizard);

router.delete('/:name', deleteWizard);

router.patch('/:name', updateWizard);

export default router;