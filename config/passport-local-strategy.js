const passport = require('passport'); //requiring the passport module

const LocalStrategy = require('passport-local').Strategy;

const User= require('../models/user'); // we are requiring the model

//Passport using Local Strategy to find the user signedin

//authentication using passport
// We are telling passport to define local strategy
passport.use(new LocalStrategy({

        usernameField: 'email', //We are identifying the user using mail
        passReqToCallback: true
},
function(req,email,password,done){   //--> email password are being passed.
    //find a user and establish the indentity
    User.findOne({email:email}, function(err,user){ //we are finding a single document 
        if(err)
        {
            req.flash('error', err);
            return done(err)
        }

        // if user is not found and password does not match
        if(!user || user.password != password){
            req.flash('error', 'Invalid Username/Password');
            return done(null,false)

        }

        return done(null,user)

    });

}

))


//serializing the user to decide which key is to be kept in the cookies
//serializing the ID of the cookie.
passport.serializeUser(function(user,done){ //inbuilt function
    done(null,user.id) // We are storing the user.id in the encrypted format.

});



//deserializing the user from the key in the cookies
passport.deserializeUser(function(id,done){
    //finding an user by id
    User.findById(id, function(err,user){
        if(err)
        {
            console.log('error in finding user ---> Passport')
            return done(err)  
        }

        return done(null, user);

    })

});

//check if the user is authenticated.
//We  have created a new function checkAuthentication.
//The following function will be used as a middleware.
passport.checkAuthentication = function(req,res,next)
{       
        //if the user is signed in, then pass on the request to the next function(controller's action)
        if(req.isAuthenticated()){ //isAuthenticated() --> passport provides this function
            return next()
        }

    //if the user is not signed in 
    return res.redirect('/users/sign-in');
 
}


// Accessing the user in the views.
passport.setAuthenticatedUser = function(req,res,next)
{
    if(req.isAuthenticated())
    {
        //req.user contains the current signed in user from the session cookie and we are just sending to the locals for the views
        res.locals.user = req.user; //req.user already handled by passport.
    }
    next();
}

module.exports=passport;