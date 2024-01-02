
const mongoose = require('mongoose');
const User = require('../models/User')
const bcrypt = require('bcryptjs');

const salt = bcrypt.genSaltSync(10);
//@desc get all users
//@route /users
//@access public
const getUsers = async (req, res) => {
    const users = await User.find();
    res.json([{ message: 'Displaying all users' }, users]);
}

//@desc register new user
//@route /register
//@access public
const register = async (req, res) => {
    const { firstName, lastName, username, email, password } = req.body;
    if (!firstName || !username) {
        throw new Error("First Name and Username are required");
    } else {

        // Hash the password
        // const passwordHashed = bcrypt.hash(password, 13);

        let hashedPassword = bcrypt.hashSync(password, salt);

        const user = new User({
            firstName: firstName,
            lastName: lastName,
            username: username,
            password: hashedPassword,
            email: email
        })
        const result = await user.save();
        res.status(201).json({ message: "New user is added....." + user.username });
    }
}

//@desc login
//@route /login
//@access public
const login = async (req, res) => {
    // destructure user fields
    const { usernameOrEmail, password } = req.body;

    // hash the password
    // let salt = bcrypt.genSaltSync(10);
    let hashedPass = bcrypt.hashSync(password, salt);
    let filter;
    //validate entered fields not empty
    if (!usernameOrEmail || !password) {
        res.status(404).json({ message: "Both username or email and password should be filled ..." })
    } else {
        // check if entered string is email
        if (usernameOrEmail.includes('@')) {
            // theUser = User.find({ email: usernameOrEmail, password: password });
            filter = { email: usernameOrEmail, password: hashedPass };
            console.log("entered string is email......." + usernameOrEmail);
        } else {
            // theUser = User.find({ username: usernameOrEmail, password: password });
            filter = { username: usernameOrEmail, password: hashedPass };
            console.log("entered string is username ......." + usernameOrEmail);
        }
        try {
            const theUser = await User.findOne(filter);
            if (!theUser) {
                res.status(401).json({
                    message: "Login not successful",
                    error: "User not found",
                    usernameOrEmail: usernameOrEmail,
                    password: hashedPass
                })
            } else {
                res.status(200).json({
                    message: "Login successful",
                    theUser,
                })
            }
        } catch (error) {
            res.status(400).json({
                message: "An error occurred",
                error: error.message,
            })
        }
    }
}

const userStatus = (req, res) => {
    res.json({ message: 'User Status' });
}

module.exports = { getUsers, register, login, userStatus };