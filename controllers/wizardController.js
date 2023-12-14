import utils from '../utils/index.js'
const { getWizData, saveWizData } = utils;

export const getWizards = async (req, res) => {
  try {
    const wizards = getWizData();
    res.json(wizards);
  } catch (err) {
    res.status(500).json({ message: "Server error yoyoyo" });
    console.log(err);
  }
};

export const getOneWizard = async (req, res) => {
  const wizName = req.params.name;
  const wizards = getWizData();
  const oneWizard = wizards.find((wizard) => wizard.name === wizName);

  if (oneWizard) {
    res.json(oneWizard);
  } else {
    res.status(404).json({ message: "Wizard not found" });
  }
};

export const createWizard = async (req, res) => {
  const newWiz = req.body;
  const wizards = getWizData();

  if (newWiz.name) {
    wizards.push({ ...newWiz });
    saveWizData(wizards);
    res
      .status(201)
      .json({ message: `New wizard [${newWiz.name}] added successfully` });
  } else {
    res.status(400).json({ message: "Invalid wizard data" });
  }
};

export const updateWizard = async (req, res) => {
  const { name } = req.params;
  const { name: newName, Age } = req.body;
  let wizards = getWizData();

  const wizardIndex = wizards.findIndex((wiz) => wiz.name === name);

  if (wizardIndex === -1) {
    return res.status(404).json({ message: "Wizard not found" });
  }

  if (newName !== undefined) {
    wizards[wizardIndex].name = newName;
  }
  if (Age !== undefined) {
    wizards[wizardIndex].Age = Age;
  }

  saveWizData(wizards);
  res.status(200).json({ message: "Wizard updated successfully" });
};

export const deleteWizard = async (req, res) => {
  const wizName = req.params.name;
  let wizards = getWizData();

  const wizardExists = wizards.some((wiz) => wiz.name === wizName);
  if (!wizardExists) {
    return res.status(404).json({ message: "Wizard not found" });
  }

  wizards = wizards.filter((wiz) => wiz.name !== wizName);
  saveWizData(wizards);
  res.status(204).json({ message: "Wizard deleted" });
};