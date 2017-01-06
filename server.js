// server.js

// set up ======================================================================
// get all the tools we need
var express  = require('express');
var app      = express();
var port     = process.env.PORT || 8080;
var mongoose = require('mongoose');
var passport = require('passport');
var bcrypt = require('bcrypt-nodejs');
var flash    = require('connect-flash');

var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');

var configDB = require('./config/database.js');
// configuration ===============================================================
//var db = 'mongodb://localhost/budget'
//mongoose.connect(db);
mongoose.Promise = global.Promise;//Due to message on my gitbash and also on the website.
mongoose.connect(configDB.url); // connect to our database

require('./config/passport')(passport); // pass passport for configuration

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({ extended: true }));

// use ejs and express layouts
app.set('view engine', 'ejs'); // set up ejs for templating

// set static files (css and images, etc) location and also using path npm.
app.use(express.static(__dirname + '/public'));

// required for passport
app.use(session({
    secret: 'anystringoftext', // session secret
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// routes ======================================================================
require('./app/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport

//app.use('/expense', expense);
//app.use('/income', income);

//Load app from exports from folder.
exports.app = app;

// launch ======================================================================
app.listen(port);
console.log('The magic happens on port ' + port);
