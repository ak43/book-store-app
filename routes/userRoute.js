const express = require('express');
const { getUsers, register, login, userStatus } = require('../controller/userController')

const userRoute = express.Router();

userRoute.get('/', getUsers);
userRoute.post('/register', register);
userRoute.post('/login', login);
userRoute.post('/userStatus', userStatus);

module.exports = userRoute;
