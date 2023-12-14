import fs from "fs";
const dataPath = "./data/wizards.json";

//some util functions for reading from and writing to the json datafile
const saveWizData = (data) => {
  const stringifyData = JSON.stringify(data);
  fs.writeFileSync(dataPath, stringifyData);
};

const getWizData = () => {
  const jsonData = fs.readFileSync(dataPath);
  return JSON.parse(jsonData);
};

const utils = {
    saveWizData,
    getWizData,
}

export default utils;