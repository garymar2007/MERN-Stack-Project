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
    result = result.toObject();
    delete result.password;
    res.send(result);
})

app.post('/login', async (req, res) => {
    if (req.body.password && req.body.email) {
        let user = await User.findOne(req.body).select('-password');
        if (user) {
            res.send(user);
        } else {
            res.send({"result": "No user found"});
        }
    } else {
        res.send({"result": "Incorrect Username or Password"});
    }
    
    
})

app.listen(5000);