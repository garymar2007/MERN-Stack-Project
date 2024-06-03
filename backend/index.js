const express = require('express');
const cors = require('cors');
require('./db/config');
const User = require('./db/User');
const app = express();

// middleware to get json body from request
app.use(express.json());
app.use(cors({origin: true}));

app.post('/register', async(req, res) => {
    console.log('Received from client...');
    console.log(req.body);
    let user = new User(req.body);
    let result = await user.save();
    res.send(result);
})

app.listen(5000);