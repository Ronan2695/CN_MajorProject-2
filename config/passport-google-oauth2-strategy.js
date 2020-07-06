// requiring passport
const passport  = require('passport');
//requiring googletstrategy for Oauth2
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
//requiring crypto
const crypto= require('crypto');
const User = require('../models/user');
const env = require('./environment');

//tell passport to use a new strategy for google login
passport.use(new googleStrategy({

    clientID:env.google_client_id,
    clientSecret:env.google_client_secret,
    callbackURL:env.google_call_back_url,
   },
    //callback function
   function(accessToken, refresh, profile, done){
       //find a user
     User.findOne({email:profile.emails[0].value}).exec(function(err,user){
         if(err)
         {
             console.log('error in google-strategy-passport',err);
             return;
         }

         console.log(profile);
         
         if(user)
         {
             //if found, set this user as request.user
             return done (null,user);   
        
        //if not found, set this user as req.user
         } else{
              User.create({
                    name:profile,
                    email:profile.emails[0].value,
                    //generating a random password
                    password: crypto.randomBytes(20).toString('hex')


              }, function(err,user){

                if(err)
                {
                    console.log('error in creating user google-strategy-passport',err);
                    return;
                }
                 
                return done(null,user);

              });

         }



     });

   }

));

module.exports=passport



