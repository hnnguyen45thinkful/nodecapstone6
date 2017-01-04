// load the things we need
var mongoose = require('mongoose');
//var bcrypt   = require('bcrypt-nodejs');//Not Required

// define the schema for our user model
var incomeSchema = mongoose.Schema({
    name: String,
    amount: Number
});

var Income = mongoose.model('Income', incomeSchema);

// create the model for users and expose it to our app
module.exports = Income;