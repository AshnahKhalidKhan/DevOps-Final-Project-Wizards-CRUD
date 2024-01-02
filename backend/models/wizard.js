import { ObjectId } from "bson";
import mongoose, { model } from "mongoose";
import { Schema } from "mongoose";

const wizSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  imagePath: {
    type: String,
    required: true,
  },
  email: {
    type: String,             //for maintaining privacy, in cases where data may be sensitive and user centric
    ref: "User",
    required: true,
  },
});

export const Wizard = mongoose.model("Wizard", wizSchema);
