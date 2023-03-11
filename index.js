const express = require('express');
const config = require('./config');
const User = require('./db')
const { serializeInteger } = require('whatwg-url');
const app = express();
const port = 3000;


var bodyParser = require('body-parser');
app.use(express.json());
app.use(express.urlencoded());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});





app.post("/adduser", function (req, res) {
    const user = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        phone: req.body.phone,
        applied_for: req.body.applied_for,
        rating: req.body.rating
    });
    user.save()
        .then(savedUser => {
            res.status(201).json(savedUser);
        })
        .catch(err => {
            console.log(err);
            res.status(500).send('Error saving user to database.');
        });
});

app.get('/users', async (req, res) => {
    try {
        // query the database for all users
        const users = await User.find();

        // return the users as a JSON response
        res.json(users);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

app.put('/users/:id', async (req, res) => {
    try {
        // Find candidate by id and update with request body data
        const user = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        // If candidate is not found, return 404 status code
        if (!user) {
            return res.status(404).send();
        }

        // Return updated candidate as JSON response
        res.json(user);
    } catch (error) {
        // Handle any errors and return 500 status code
        console.error(error);
        res.status(500).send();
    }
});

app.delete('/users/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        const deletedUser = await User.findByIdAndDelete(userId);
        res.send(deletedUser);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

app.get('/users/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).send('User not found');
        }
        res.send(user);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

app.get('/error', (req, res) => {
    res.send('adding user failed!');
});


app.get('/sagar', (req, res) => {
    res.send('Hello World sagar!');
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
