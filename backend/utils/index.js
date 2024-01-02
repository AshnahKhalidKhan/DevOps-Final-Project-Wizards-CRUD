import fs from "fs";
import { JSON_FILE_PATH } from "../constants/constants.js";

//some util functions for reading from and writing to the json datafile
const saveWizData = (data) => {
  const stringifyData = JSON.stringify(data);
  fs.writeFileSync(JSON_FILE_PATH, stringifyData);
};

const getWizData = () => {
  const jsonData = fs.readFileSync(JSON_FILE_PATH);
  return JSON.parse(jsonData);
};

const utils = {
    saveWizData,
    getWizData,
}

export default utils;