import utils from '../utils/index.js'
import { Wizard } from '../models/wizard.js';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const storage = multer.diskStorage({
  //was confused about multer, asked Umair
  destination: (req, file, cb) => {
    cb(null, './frontend/public')
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname))
  }
})

const upload = multer({ storage: storage })

const { getWizData, saveWizData } = utils;

export const getWizards = async (req, res) => {
  try {
    const wizards = await Wizard.find({email: req.user.email});
    res.json(wizards);
  } catch (err) {
    res.status(500).json({ message: "Server error yoyoyo" });
    console.log(err);
  }
};

export const getOneWizard = async (req, res) => {
  const wizName = req.params.name;
  const wizards = await Wizard.find({email: req.user.email});
  const oneWizard = wizards.find((wizard) => wizard.name === wizName);

  if (oneWizard) {
    res.json(oneWizard);
  } else {
    res.status(404).json({ message: "Wizard not found" });
  }
};

export const createWizard = async (req, res) => {
  const newWiz = req.body;
  const newImage = req.file.path

  try
  {
    const searchTerm = 'public\\'
    const index = newImage.indexOf(searchTerm)
    const extractedPart = newImage.slice(index + searchTerm.length);
    if(newWiz)
    {
      const newWiz = new Wizard({
        name: newItem.name,
        age: newItem.age,
        imagePath: extractedPart,
        email: req.user.email
      })
      await newWiz.save()
      
      return res.status(201).json({ message: 'Added Successfully' });
    }
    return res.status(400).json({ message: 'Bad Request' });
  }
  catch(err)
  {
    console.log(err)
    return res.status(500).json({message: "Invalid Data"})
  }
};

export const updateWizard = async (req, res) => {
  const wizName = req.params.name;
  const updatedName = req.body.name;
  const updatedAge = req.body.age;
  try
  {
    const existingItem = await Wizard.find({'name' : new RegExp(wizName, 'i')}, function(err, docs){
      cb(docs);
  });
    if(existingItem) {
      const updatedWiz = await starWars.findOneAndUpdate(
        existingItem,
        {
          name: updatedName,
          age: updatedAge
        },
        { new: true }
      )
      await updatedWiz.save()
      res.status(200).json( { message:"Updated successfully" } )
    }
    return res.status(404).json( { message: "Wizard not found" } )
  }
  catch(err)
  {
    res.status(500).json( { message: "Server Error" } )
  }

  // const { name } = req.params;
  // const { name: newName, ge } = req.body;
  // let wizards = getWizData();

  // const wizardIndex = wizards.findIndex((wiz) => wiz.name === name);

  // if (wizardIndex === -1) {
  //   return res.status(404).json({ message: "Wizard not found" });
  // }

  // if (newName !== undefined) {
  //   wizards[wizardIndex].name = newName;
  // }
  // if (Age !== undefined) {
  //   wizards[wizardIndex].Age = Age;
  // }

  // saveWizData(wizards);
  // res.status(200).json({ message: "Wizard updated successfully" });
};

export const deleteWizard = async (req, res) => {
  try
  {
    const wizName = req.params.name;
    const wiz = await Wizard.find({'name' : new RegExp(wizName, 'i')}, function(err, docs){
      cb(docs);
  });
    if (!wiz) {
      return res.status(404).json({ message: 'Wizard not found' });
    }
    if(wiz.imagePath)
    {
      fs.unlink(`/home/moatasim/Folio3/node_training/Tasks/node-backend/frontend/public/${wiz.imagePath}`, (err) => {
        if(err)
        {
          console.log(err)
        }
        else
        {
          console.log("File deleted successfully")
        }
      })
    }

    await Wizard.findOneAndDelete(wizName)
    
    return res.status(204).json({ message: "Wizard record deleted" });
  }
  catch(err)
  {
    return res.status(500).json({ message: 'Server Error' });
  }
};