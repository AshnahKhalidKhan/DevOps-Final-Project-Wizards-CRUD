import {Wizard} from '../models/wizard.js';

export const getWizards = async (req, res) => {
  try {
    const wizards = await Wizard.find({});
    return res.status(200).json({
      count: wizards.length,
      data: wizards,
    }
    );

    } catch (err) {
    res.status(500).json({ message: "Server error cant get all" });
    console.log(err);
  }
};

export const getOneWizard = async (req, res) => {
  try {
    const {id} = req.params;
    const wiz = await Wizard.findById(id);
    return res.status(200).json(wiz);
  } catch (error) {
    console.log(error);
    return res.status(404).json({message:"Wizard not found, check id"})
  }
};

export const createWizard = async (req, res) => {
  try {
    if (
      !req.body.name ||
      !req.body.age ||
      !req.body.imagePath
    ) {
      return res.status(400).send({
        message: 'Send all required fields',
      });      
    }
    const newWiz = {
      name: req.body.name,
      age: req.body.age,
      imagePath: req.body.imagePath,
    };

    const wiz = await Wizard.create(newWiz);

    return res.status(201).send(wiz);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

export const updateWizard = async (req, res) => {
  try {
    if (
      !req.body.name ||
      !req.body.age ||
      !req.body.imagePath
    ) {
      return res.status(400).send({
        message: 'Send all required fields',
      });
    }
    const { id } = req.params;

    const wizard = await Wizard.findByIdAndUpdate(id, req.body);

    if (!wizard) {
      return res.status(404).json({ message: 'Wizard not found' });
    }

    return res.status(200).send({ message: 'Wizard updated successfully' });
    
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
};

export const deleteWizard = async (req, res) => {
  try {
    const {id} = req.params;
    const wizard = await Wizard.findByIdAndDelete(id);
    if (!wizard) {
      return res.status(404).json({ message: 'Wizard not found' });
    }

    return res.status(200).send({ message: 'Wizard deleted successfully' });

  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
};