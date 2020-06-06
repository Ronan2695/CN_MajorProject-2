const passport = require('passport'); //requiring the passport module

const LocalStrategy = require('passport-local').Strategy;

const User= require('../models/user'); // we are requiring the model

//Passport using Local Strategy to find the user signedin

//authentication using passport
// We are telling passport to define local strategy
passport.use(new LocalStrategy({

        usernameField: 'email' //We are identifying using
},
function(email,password,done){   //--> email password are being passed.
    //find a user and establish the indentity
    User.findOne({email:email}, function(err,user){
        if(err)
        {
            console.log('error in finding user ---> Passport')
            return done(err)
        }

        // if user is not found and password does not match
        if(!user || user.password != password){
            console.log('invalid Username and password')
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

module.exports=passport;