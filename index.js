import express from 'express';
import bodyParser from 'body-parser';
import wizardRoutes from './routes/wizards.js';

const app = express();
const PORT = 5000;

app.use(bodyParser.json());

app.use('/wizards', wizardRoutes)

app.get('/', (req, res) => {
    console.log('TEST');
    res.send('Hello yall');
})

app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`));
