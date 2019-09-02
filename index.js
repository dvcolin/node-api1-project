const express = require('express');

const Users = require('./data/db');

const server = express();

server.use(express.json());

// POST REQUEST
server.post('/users', (req, res) => {
    const userInfo = req.body;

    if(userInfo.hasOwnProperty('name') && userInfo.hasOwnProperty('bio')) {
        Users.insert(userInfo)
            .then(user => {
                res.status(201).json(user);
            })

            .catch(err => {
                res.status(500).json({ error: "There was an error while saving the user to the database" });
            })

    } else {
            res.status(400).json({ errorMessage: "Please provide name and bio for the user." });
    }
})

// GET REQUEST

server.get('/users', (req, res) => {
    Users.find()
    .then(users => {
        res.status(200).json(users)
    })
    .catch(err => {
        res.status(500).json({ error: "The users information could not be retrieved." })
    })
})









const port = 8000;
server.listen(port, () => console.log('api running'));
