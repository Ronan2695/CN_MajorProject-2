const User = require('../models/user')


module.exports.profile = function(req, res)
{
    return res.render('user',{

        title:"Home"

    });
}

module.exports.edit = function(req, res)
{

    res.end('<h1> User edit page </h1>')

}

//signinpage
module.exports.signin = function(req, res)
{

    return res.render('user_signin', {
        
        title:"CODIAL | SIGN IN"

    });

}

//signuppage
module.exports.signup = function(req, res)
{

    return res.render('user_signup',{
        
        title:"CODIAL | SIGN UP"

    });

}


//get the signup data
module.exports.create = function(req,res){

    if(req.body.password!= req.body.confirm_password)
    {
       return res.redirect('back');
    } 

    User.findOne({email: req.body.email}, function(err, user){
        if(err)
        {
            console.log('Error in finding user in signing up');
            return
        }

        if(!user)
        {
            User.create( req.body, function(err,user){
                    if(err){
                        console.log('Error in creating user while signing up');
                        return
                    }

                    return res.redirect('/users/sign-in')

            })
            
        }else{
            return res.redirect('back');
        }


    }) 

}

//sign in and create a session for the user
module.exports.createSession = function(req,res){

//STEPS TO AUTHENTICATE
//FIND USER
User.findOne({email:req.body.email}, function(err,user){

    if(err)
    {
        console.log('Error in finding user in signing in');
        return
    }
    //HANDLE USER FOUND  
    if(user)
    {

        //HANDLE PASSWORD WHICH DON'T MATCH
        if (user.password!=req.body.password)
        {
        return res.redirect('back')
        }

        //HANDLE SESSION CREATION.
        res.cookie('user_id', user.id); // Cookie CREATIon 
        return res.redirect('/users/profile');
    
    }
    else //HANDLE USER NOT FOUND 
    {
        return res.redirect('back')
    }

});

  

//HANDLE PASSWORD WHICH DON'T MATCH

//HANDLE SESSION CREATION.

//HANDLE USER NOT FOUND

}