import express from 'express';
import { getWizards, createWizard, getOneWizard, deleteWizard, updateWizard } from '../controllers/wizardController.js';
import passport from 'passport';


const router = express.Router();

router.get('/',passport.authenticate('jwt', { session: false }), getWizards);

router.post('/', passport.authenticate('jwt', { session: false }), createWizard);

router.get('/:name', getOneWizard);

router.delete('/:name', passport.authenticate('jwt', { session: false }), deleteWizard);

router.patch('/:name', updateWizard);

export default router;