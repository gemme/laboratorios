const express = require('express');
const router = express.Router();
const connector = require('../DBConnector');
const User = require('../model/User');
const bcrypt = require('bcrypt');

router.get('/', (req, res, next) => {
    res.status(200).render('register');
});
router.post('/', async (req, res, next) => {
    console.log('req.params', req.params);
    console.log('req.body', req.body);
    const body = {...req.body};
    const connect = await connector.connect();

    const user = await User.find({
        username: body.username
    });

    if(Object.keys(user).length){
        body.errorMessage = 'Username already exists!'
        res.render('register', body);
    } else {
        body.password = await bcrypt.hash(body.password, 7);
        const data = await User.create(body);
        req.session.user = data;
        res.status(200).redirect('/');
    }

});

module.exports = router;