const passport = require('passport');
//importing the strategy
const JWTStrategy = require('passport-jwt').Strategy;
//Exracting JWT from the header
const ExtractJWT= require('passport-jwt').ExtractJwt;

//We are requiring the users model.
const User = require('../models/user');

let opts = {

    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    //This the encryption and decryption String
    secretOrKey: 'codeial'

}

passport.use(new JWTStrategy(opts, function(jwtPayLoad, done){

    User.findById(jwt.jwtPayLoad._id, function(err,user){
        if(err)
        {
            console.log('Error in finding user from JWT');
            return 
        }

        if(user)

        {
            return done(null,user); 
        }else
        return done ( null, false);
    })

}));

module.exports = passport;


