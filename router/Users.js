const express = require('express');
const users = express.Router();
const cors = require('cors');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const User = require("../models/User");
users.use(cors());

process.env.SECRET_KEY = 'secret';

//register
users.post("/register", (req, res) => {
    const today = new Date();
    const UserData = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: req.body.password,
        created: today
    }
    User.findOne({
        where: {
            email: req.body.email
        }
    })
        .then(user => {
            if (!user) {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    UserData.password = hash
                    User.create(UserData)
                        .then(user => {
                            res.json({ status: user.email + ' registered' })
                        })
                        .catch(err => {
                            res.send("error: " + err)
                        })
                })
            }
            else {
                res.json({ error: 'User alreadly exists.' })
            }
        })
        .catch(err => {
            res.send("error: " + err)
        })
})

//login
users.post('/login', async (req, res) => {
    try {
        var user = await User.findOne({
            where: {
                email: req.body.email
            }
        });
        if (user) {
            if (bcrypt.compareSync(req.body.password, user.password)) {
                let token = jwt.sign(user.dataValues, process.env.SECRET_KEY, {
                    expiresIn: 1440
                })
                res.send(token)
            }
        } else {
            res.status(400).json({ error: 'User does not exist.' })
        }
    }
    catch (err) {
        res.status(400).json({ error: err })
    }

})

module.exports = users