const express = require('express');
const cors = require('cors');
// const fetch = require('node-fetch');

const app = express();
const port = 3000;

//encountered 304 status code in the GET call, and inspect element had this line: "Response body is not available to scripts (Reason: CORS Missing Allow Origin)"
//therefore, added the following line:
app.use(cors());

// Routing
app.get('/api/todos/1', (req, res) => {
    fetch('https://jsonplaceholder.typicode.com/todos/1')
        .then(response => response.json())
        .then(json => res.json(json)) //send response back to client
        .catch(error => {
            console.log('Error fetching data from url:', error);
            res.status(500).send('Error fetching data');
        });
});

//server startup
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
