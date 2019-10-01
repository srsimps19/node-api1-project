// implement your API here
const express = require('express');

const usersModel = require('./data/db.js');

const server = express();

server.use(express.json());

server.post('/api/users', (req, res) => {
    const userData = req.body
    if (!userData.name){
        res.status(400).json({ errorMessage: "Please provide name for the user." });
    } else if (!userData.bio){
        res.status(400).json({ errorMessage: "Please provide bio for the user." });
    } else {
        usersModel
            .insert(userData)
            .then(user => {
                res.status(201).json(user);
            })
            .catch(error => {
                res.status(500).json({ error: "There was an error while saving the user to the database" })
            });
    }
});

server.get('/api/users', (req, res) => {
    usersModel
        .find()
        .then(user => {
            res.status(200).json(user);
        })
        .catch(error => {
            res.status(500).json({ error: "The users information could not be retrieved." })
        });
});

server.get('/api/users/:id', (req, res) => {
    const id = req.params.id;

    usersModel
        .findById(id)
        .then(user => {
            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).json({ message: 'The user with the specified ID does not exist.' });
            }
        })
        .catch(error => {
            res.status(500).json({ error: "The user information could not be retrieved." })
        });
})

server.delete('/api/users/:id', (req, res) => {
    const id = req.params.id;

    usersModel
        .remove(id)
        .then(user => {
            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).json({ message: 'The user with the specified ID does not exist.' });
            }
        })
        .catch(error => {
            res.status(500).json({ error: "The user could not be removed" });
        });
});

server.put('/api/users/:id', (req, res) => {
    const id = req.params.id;
    const changes = req.body
    if (!changes.name){
        res.status(400).json({ errorMessage: "Please provide name for the user." });
    } else if (!changes.bio){
        res.status(400).json({ errorMessage: "Please provide bio for the user." });
    } else {
    usersModel
        .update(id, changes)
        .then(user => {
            if (user) {
              res.status(200).json(user);
            } else {
              res.status(404).json({ message: 'The user with the specified ID does not exist.' });
            }
        })
        .catch(error => {
            res.status(500).json({ error: "The user information could not be modified." });
        });
    };
});

const port = 8000;
server.listen(port, () => console.log(`\n** API on port ${port} **\n`))