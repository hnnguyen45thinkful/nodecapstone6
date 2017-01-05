// load the things we need
var mongoose = require('mongoose');
//var bcrypt   = require('bcrypt-nodejs');//Not Required

// define the schema for our user model
var expenseSchema = mongoose.Schema({
    name_of_expense: String,
    company_name: String,
    payee: String,
    pay_period: ,
});

var Expense = mongoose.model('Expense', billSchema);

// create the model for users and expose it to our app
module.exports = Expense;
