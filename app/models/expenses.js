// load the things we need
var mongoose = require('mongoose');
//var bcrypt   = require('bcrypt-nodejs');//Not Required

// var myDB = 'mongodb://localhose/dbName';
//mongoose.connec(myDB);


// define the schema for our user model
var expenseSchema = mongoose.Schema({
    name_of_expense: String,
    company_name: String,
    payee: String,
    pay_period: ,
});

// Valid Types of Schema Types mongoosejs.com/docs/schematypes.html
//String,
//Number,
//Date,
//Buffer,
//Boolean,
//Mixed,
//Objectid,
//Array






var Expense = mongoose.model('Expense', expenseSchema);

// create the model for users and expose it to our app
module.exports = Expense;
