import mongoose, { model } from "mongoose";

const wizSchema = new mongoose.Schema(
  {
    name: {
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
  }
);

export const Wizard = mongoose.model("Wizard", wizSchema);
