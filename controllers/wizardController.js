let wizards = [];

export const getWizards = async (req, res) => {
  try {
    res.json(wizards);
  } catch (err) {
    res.status(500);
    console.log(err);
  }
};

export const getOneWizard = async (req, res) => {
  const wizName = req.params.name;
  const oneWizard = wizards.find((wizard) => wizard.name === wizName);
  if (oneWizard) {
    res.json(oneWizard);
  }
  res.status(404);
};

export const createWizard = async (req, res) => {
  const newWiz = req.body;
  if (newWiz.name) {
    wizards.push({ ...newWiz });
    return res
      .status(201)
      .json({ message: `New wizard [${newWiz.name}] added successfully` });
  }
  return res.status(500).json({ message: "Server error" });
};

export const updateWizard = async (req, res) => {
  const { name } = req.params;
  const { name: newName, Age } = req.body;

  const updatedWiz = wizards.find((wiz) => wiz.name === name);

  if (!updatedWiz) {
    return res.status(404).json({ message: "Wizard not found" });
  }

  if (newName !== undefined) {
    updatedWiz.name = newName;
    console.log(`${name}'s name has been updated to ${newName}`);
  }
  if (Age !== undefined) {
    updatedWiz.Age = Age;
    console.log(`${name}'s age has been updated to ${Age}`);
  }

  return res.status(200).json({ message: "Wizard updated successfully" });
};

export const deleteWizard = async (req, res) => {
  const wizName = req.params.name;
  wizards = wizards.filter((wiz) => wiz.name !== wizName);
  return res.status(204).json({ message: "Item deleted" });
};
