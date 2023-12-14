import express from 'express';
import bodyParser from 'body-parser';
import wizardRoutes from './routes/wizards.js';
import cors from 'cors';
import { BACKEND_PORT, FRONTEND_IP } from './constants/portConstants.js';

const app = express();

app.use(bodyParser.json());
app.use(cors({ origin: FRONTEND_IP, credentials: true }));
app.use('/wizards', wizardRoutes)

app.get('/', (req, res) => {
    console.log('ROOT-TEST');
    res.send('Hello! This is the Root directory, please proceed to type /wizards in the address bar.');
})

app.listen(BACKEND_PORT, () => console.log(`Server running on port: http://localhost:${BACKEND_PORT}`));
