const express = require('express');
const path = require('path');
const session = require('express-session')
const passport = require('passport')
const {SECRET} = require('./config')

require('./strategies/discordStrategy')


const app = express()

// Setttings

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

// Middlewares
app.use(session({
    secret: SECRET,
    saveUninitialized: false,
    resave: false

}))

app.use(express.static(__dirname + '/public'));
app.use(passport.initialize())
app.use(passport.session())

//Global Variables
app.use((req, res, next) => {
    app.locals.user = req.user
    next()
})


// Routes
app.use('/', require('./routes/index.routes'))
app.use('/auth', require('./routes/auth.routes'))
app.use('/dashboard', require('./routes/dashboard.routes'))
module.exports = app
