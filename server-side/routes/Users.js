const express = require('express');
const router = express.Router();
const Users = require('../models/Users');
const { where } = require('sequelize');

router.post('/users', async(req, res) => {
    const user = req.body;
    await Users.create(user);
    console.log(Users);
    res.json(user);
});

router.get('/users/:email', async (req, res) => {
    const userEmail = req.params.email;
    const isExist = await Users.findOne({where: {email: userEmail}});
    if (isExist !== null) {
        res.json({status: true});
    }
    else {
        res.json({status: false})
    }
})

router.get('/', async (req, res) => {
    res.send("Welcome to your server")
    console.log('server is on (hello from router)');
});

module.exports = router;