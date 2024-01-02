const express = require('express');
const mongoose = require('mongoose');

const bookRoute = require('./routes/bookRoute');
const userRoute = require('./routes/userRoute');
const dotenv = require('dotenv').config();
const errorHandler = require('./middleware/errorHandling');
const db_connect = require('./databaseConfig/databaseConfig');
db_connect();

const app = express();
app.use(express.json());
app.use('/api/book/', bookRoute);
app.use('/api/user/', userRoute);
app.use(errorHandler);

//Setting portNo thru envt var (.env) not working - error
const portNo = 3000;
// const portNo = process.env.PORT_NUMBER || 3000;

app.listen(portNo, () => {
    console.log(`Server is running on localhost:${portNo}`);
});


