// load the things we need
var mongoose = require('mongoose');
//var bcrypt   = require('bcrypt-nodejs');//Not Required

// define the schema for our user model
var incomeSchema = mongoose.Schema({
    name_of_worker: String,
    company_name: String,
    company_title: String,
    pay_period: String,
    yearly: Number,
    user_id: String,
});

var Income = mongoose.model('Income', incomeSchema);

// create the model for users and expose it to our app
module.exports = Income;