import express from "express";
import bodyParser from "body-parser";
import wizardRoutes from "./routes/wizardRoutes.js";
import cors from "cors";
import { BACKEND_PORT, FRONTEND_IP } from "./constants/constants.js";
import mongoose from "mongoose";
import passport from 'passport';
import cookieParser from 'cookie-parser';
import fs from 'fs';


const app = express();

// connection string mongodb
const dbURI =
  "mongodb+srv://moatasimbinhisham:Moatas19M200@clusterfoli0.yaar50y.mongodb.net/hogwarts?retryWrites=true&w=majority";
mongoose
  .connect(dbURI)
  .then((result) =>
    app.listen(BACKEND_PORT, () =>
      console.log(`Server running on port: http://localhost:${BACKEND_PORT}`)
    )
  )
  .catch((err) => console.log(err));

const db = mongoose.connection;

db.on("connected", () => {
  console.log("Mongoose connection is open");
});

app.use(bodyParser.json());
app.use(cors({ origin: FRONTEND_IP, credentials: true }));
db.on("error", (error) => console.log(error));
app.use(passport.initialize())
app.use(cookieParser())


fs.readdir('./routes/', (err, files) => {
  if (err) {
    console.error('Error reading directory:', err);
    return;
  }

  files.forEach(file => {
    if (file.endsWith('Routes.js')) {
      const routeName = '/' + file.substring(0, file.indexOf('Routes')).toLowerCase();
      const completeName = file.replace('.js', '');
      const routeFunction = require(`./routes/${completeName}`);

      if (typeof routeFunction === 'function') {
        app.use(routeName, routeFunction);
      } else {
        console.error(`Route file '${completeName}' does not export a valid function.`);
      }
    }
  });
});

app.get("/", (req, res) => {
  res.send("<h1>Welcome to the Wizard API</h1>");
});
