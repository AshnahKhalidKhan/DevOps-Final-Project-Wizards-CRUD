let wizards = [];

//get working correctly, chacked using postman
export const getWizards = async (req, res) => {
  try {
    res.json(wizards);
  } catch (err) {
    res.status(500);
    console.log(err);
  }
};

//fine tune this
export const getOneWizard = async (req, res) => {
    const wizName = req.params.name
    const oneWizard = wizards.find(wizard => { wizard.name === wizName})
    if(oneWizard)
    {
      res.json(oneWizard)
    }
    res.status(404);
  }

//post working correctly, checked using postman
export const createWizard = async (req, res) => {
  const newWiz = req.body;
  if (newWiz.name) {
    wizards.push({...newWiz});
    return res.status(201).json({ message: `New wizard [${newWiz.name}] added successfully` });
  }
  return res.status(500).json({ message: "Server error" });
};

export const updateWizard = async (req, res) => {
    const wiz = wizards.find((wiz) => wiz.name === req.params.name);
    
    wiz.name = req.body.name;
    wiz.Age = req.body.age;

    console.log(`name has been updated to ${req.body.name}.age has been updated to ${req.body.age}`)

  }
  
  export const deleteWizard = async (req, res) => {
    const wizName = req.params.name;
    wizards = wizards.filter( wiz => wiz.name !== wizName)
    return res.status(204).json({ message: "Item deleted" });
  }
  

