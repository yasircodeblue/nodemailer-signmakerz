const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config()

const { postMessage } = require('./controllers/nodeController');

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('running');
});

app.post('/send', postMessage);

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Connected on port ${port}`);
});
