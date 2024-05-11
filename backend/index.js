import express from "express";
import bodyParser from "body-parser";
import wizardRoute from "./routes/wizardRoute.js";
import authRoute from "./routes/authRoute.js";
import cors from "cors";
import { BACKEND_PORT, FRONTEND_IP, dbURI } from "./constants/constants.js";
import mongoose from "mongoose";


const app = express();

app.use(bodyParser.json());

app.use(cors({ origin: FRONTEND_IP, credentials: true }));

app.get("/", (req, res) => {app.use(bodyParser.json());

  res.send("<h1>Welcome to the Wizard API11111111111111111111</h1>");
});

app.use('/wizards', wizardRoute);
app.use('/uploads', express.static('uploads'));
app.use(authRoute);



// connection string mongodb
mongoose
  .connect(dbURI)
  .then(() =>
    app.listen(BACKEND_PORT, () =>
      console.log(`Server running on port: http://34.128.89.226:${BACKEND_PORT}`)
    )
  )
  .catch((err) => console.log(err));