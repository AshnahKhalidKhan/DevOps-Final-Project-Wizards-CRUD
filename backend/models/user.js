import mongoose from "mongoose";
import { Wizard } from "./wizard";

const userSchema = new mongoose.Schema({
    id: {
      type: mongoose.Schema.Types.ObjectId
    },
  
    email: {
      type: String,
      required: true
    },
  
    password: {
      type: String,
      required: true
    }
  });

  export const User = mongoose.model('User', userSchema);
