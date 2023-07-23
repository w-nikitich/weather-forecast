const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const userRouter = require('./routes/Users');
const {sq, testDbConnection} = require('./db/db');
const port = 3000;

app.use(express.json());
app.use( bodyParser.json()); 
app.use(bodyParser.urlencoded({extended: false})); 
app.use(cors());
app.use(userRouter);
// app.use('/', userRouter);

sq.sync().then(() => {
    app.listen(port, () => {
        console.log('server is on');
    })
});