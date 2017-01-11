var User       = require('./models/user');
//var Bill       = require('./models/bill');
var Expense = require('./models/expenses');
var Income  = require('./models/incomes');
module.exports = function(app, passport) {

// normal routes ===============================================================

    // show the home page (will also have our login links)
    app.get('/', function(req, res) {
        res.render('index.ejs');
    });

   // // app.post('/insert', function(req,res){
   //      Bill.create({name: req.body.name, amount: req.body.amount}, function(err, bill){
   //          if(!err){
   //              res.send(bill);
   //          }
   //      });
   //  });

    // app.delete('/', function(req,res){
        
    // });


// change the bill model to have a userid property, change the insert method to set userid: req.user._id
// change the profile to only find bills where userid: req.user._id
app.get('/', function(req, res) {
    res.render('profile');
});

app.get('/income', function(req, res){
    // Income.create
    res.render('income.ejs',{user:req.user});
});

app.get('/expense', function(req, res){
    // Expense.create
    res.render('expense.ejs',{user:req.user});
});

app.get('/profile', isLoggedIn, function(req, res) {
    var incomes;
    var expenses;
    Income.find({user_id:req.user._id}).exec()
    .then(function(data){
        incomes = data;
        return Expense.find({user_id:req.user._id}).exec();
    })
    .then(function(data){
        expenses = data;
        res.render('profile.ejs',{incomes:incomes,expenses:expenses});
    });
    
    
});

app.post('/incomes/addincome',function(req,res){
    Income.create(req.body, function(err,income){
        if(!err){
            res.redirect('/profile');
        }
    });
});

app.post('/expenses/addexpense', function(req,res){
    Expense.create(req.body, function(err, result){
        if(err != null) res.send('Insert Income Error');
        else res.redirect('/profile');
    });
});

// DELETE
app.delete('/deleteincome/:id', function(req, res){
    var incomeToDelete = req.params.id;
    Income.remove({ '_id' : incomeToDelete }, function(err,income){
        res.send(
           (err !== null) ? { msg : err } : { msg : 'success' }
        );
    });
});


app.delete('/deleteexpense/:id', function(req, res){   
    var expensesToDelete = req.params.id;
    Expense.remove({ '_id' : expensesToDelete }, function(err, expense){
        res.send(
           (err !== null) ? { msg : err } : { msg : 'success' }
        );
    });
});




// INCOMES
// app.post('/addincome', function(req, res){
//     incomes.insert( req.body, function(err, result){
//         if(err != null) res.send('Insert Income Error');
//         else res.redirect('/');

//     });
// });

// app.get('/incomelist', function(req, res){
//     incomes.find({},{},function(e,docs){
//         res.json(docs);
//     });
// });

//EXPENSES
// app.get('/expenselist', function(req, res){
//     Expense.find({},{},function(e,docs){
//         res.json(docs);
//     });
// });



// DELETE
// app.delete('/deleteincome/:id', function(req, res){
//     var incomeToDelete = req.params.id;
//     Income.remove({ '_id' : incomeToDelete }, function(err,income){
//         res.send(
//            (err !== null) ? { msg : err } : { msg : 'success' }
//         );
//     });
// });


// app.delete('/deleteexpense/:id', function(req, res){   
//     var expensesToDelete = req.params.id;
//     Expense.remove({ '_id' : expensesToDelete }, function(err, expense){
//         res.send(
//            (err !== null) ? { msg : err } : { msg : 'success' }
//         );
//     });
// });

    // PROFILE SECTION =========================
    // app.get('/profile', isLoggedIn, function(req, res) {
    //     res.render('profile.ejs', {
    //         user : req.user // get the user out of session and pass to template
    //     });
    // });

    // LOGOUT ==============================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

// =============================================================================
// AUTHENTICATE (FIRST LOGIN) ==================================================
// =============================================================================

    // locally --------------------------------
        // LOGIN ===============================
        // show the login form
        app.get('/login', function(req, res) {
            res.render('login.ejs', { message: req.flash('loginMessage') });
        });

        // process the login form
        app.post('/login', passport.authenticate('local-login', {
            successRedirect : '/profile', // redirect to the secure profile section
            failureRedirect : '/login', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));

        // SIGNUP =================================
        // show the signup form
        app.get('/signup', function(req, res) {
            res.render('signup.ejs', { message: req.flash('signupMessage') });
        });

        // process the signup form
        app.post('/signup', passport.authenticate('local-signup', {
            successRedirect : '/profile', // redirect to the secure profile section
            failureRedirect : '/signup', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));

    // facebook -------------------------------

        // send to facebook to do the authentication
        app.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));

        // handle the callback after facebook has authenticated the user
        app.get('/auth/facebook/callback',
            passport.authenticate('facebook', {
                successRedirect : '/profile',
                failureRedirect : '/'
            }));

    // twitter --------------------------------

        // send to twitter to do the authentication
        app.get('/auth/twitter', passport.authenticate('twitter', { scope : 'email' }));

        // handle the callback after twitter has authenticated the user
        app.get('/auth/twitter/callback',
            passport.authenticate('twitter', {
                successRedirect : '/profile',
                failureRedirect : '/'
            }));


    // google ---------------------------------

        // send to google to do the authentication
        app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

        // the callback after google has authenticated the user
        app.get('/auth/google/callback',
            passport.authenticate('google', {
                successRedirect : '/profile',
                failureRedirect : '/'
            }));

// =============================================================================
// AUTHORIZE (ALREADY LOGGED IN / CONNECTING OTHER SOCIAL ACCOUNT) =============
// =============================================================================

    // locally --------------------------------
        app.get('/connect/local', function(req, res) {
            res.render('connect-local.ejs', { message: req.flash('loginMessage') });
        });
        app.post('/connect/local', passport.authenticate('local-signup', {
            successRedirect : '/profile', // redirect to the secure profile section
            failureRedirect : '/connect/local', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));

    // facebook -------------------------------

        // send to facebook to do the authentication
        app.get('/connect/facebook', passport.authorize('facebook', { scope : 'email' }));

        // handle the callback after facebook has authorized the user
        app.get('/connect/facebook/callback',
            passport.authorize('facebook', {
                successRedirect : '/profile',
                failureRedirect : '/'
            }));

    // twitter --------------------------------

        // send to twitter to do the authentication
        app.get('/connect/twitter', passport.authorize('twitter', { scope : 'email' }));

        // handle the callback after twitter has authorized the user
        app.get('/connect/twitter/callback',
            passport.authorize('twitter', {
                successRedirect : '/profile',
                failureRedirect : '/'
            }));


    // google ---------------------------------

        // send to google to do the authentication
        app.get('/connect/google', passport.authorize('google', { scope : ['profile', 'email'] }));

        // the callback after google has authorized the user
        app.get('/connect/google/callback',
            passport.authorize('google', {
                successRedirect : '/profile',
                failureRedirect : '/'
            }));

// =============================================================================
// UNLINK ACCOUNTS =============================================================
// =============================================================================
// used to unlink accounts. for social accounts, just remove the token
// for local account, remove email and password
// user account will stay active in case they want to reconnect in the future

    // local -----------------------------------
    app.get('/unlink/local', isLoggedIn, function(req, res) {
        var user            = req.user;
        user.local.email    = undefined;
        user.local.password = undefined;
        user.save(function(err) {
            res.redirect('/profile');
        });
    });

    // facebook -------------------------------
    app.get('/unlink/facebook', isLoggedIn, function(req, res) {
        var user            = req.user;
        user.facebook.token = undefined;
        user.save(function(err) {
            res.redirect('/profile');
        });
    });

    // twitter --------------------------------
    app.get('/unlink/twitter', isLoggedIn, function(req, res) {
        var user           = req.user;
        user.twitter.token = undefined;
        user.save(function(err) {
            res.redirect('/profile');
        });
    });

    // google ---------------------------------
    app.get('/unlink/google', isLoggedIn, function(req, res) {
        var user          = req.user;
        user.google.token = undefined;
        user.save(function(err) {
            res.redirect('/profile');
        });
    });


};

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/');
}


