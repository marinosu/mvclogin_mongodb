const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const session = require('express-session');
dotenv.config();
const passport = require('passport');
const { loginCheck } = require('./auth/passport');
loginCheck(passport);

//Mongo DB connection
const database = process.env.MONGOLAB_URI; /* MONGOLAB_URI - CONTENTS CREDENTIALS */
mongoose.connect(database, {useUnifiedTopology: true, useNewUrlParser: true})
.then(() => console.log('done connect'))
.catch(err => console.log(err));

app.set('view engine', 'ejs');

//BodyParsing
app.use(express.urlencoded({ extended: false }));
app.use(session({
    secret:'oneboy',
    saveUninitialized: true,
    resave: true
}));

app.use(passport.initialize());
app.use(passport.session());
//Routes
app.use('/', require('./routes/login'));

const PORT = process.env.PORT || 4111;

app.listen(PORT, console.log("Server done start for port: " + PORT));