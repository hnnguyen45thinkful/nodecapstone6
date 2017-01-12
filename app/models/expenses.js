// load the things we need
var mongoose = require('mongoose');
//var bcrypt   = require('bcrypt-nodejs');//Not Required

// var myDB = 'mongodb://localhost/dbName';
//mongoose.connec(myDB);


// Valid Types of Schema Types mongoosejs.com/docs/schematypes.html
//String,
//Number,
//Date,
//Buffer,
//Boolean,
//Mixed,
//Objectid,
//Array


// define the schema for our user model
var expenseSchema = mongoose.Schema({
    name_of_expense: String,
    company_name: String,
    payee: String,
    pay_period: {
    	type: String,
    	required: true
    },
    date_of_month:String,
    monthly: String,
    user_id : String  
//Ask Question delete button which schema.

});

var Expense = mongoose.model('Expense', expenseSchema);

// create the model for users and expose it to our app
module.exports = Expense;
