const User = require('../models/user') // We are importing the model.


//Redirecting back to the profile page after signing in
module.exports.profile = function(req, res){

    //check user_id present in cookies
    if(req.cookies.user_id)
    {
        User.findById(req.cookies.user_id, function(err,user)   {
            if(user) //user is found 
            { 
             return res.render('user',{
                    title: "User Profile", 
                    user:user
                });     
            }
            return res.redirect('/users/sign-in'); 
        });
    }   
    //if user is already present
    else
    {
        return res.redirect('/users/sign-in')
    }
}

module.exports.edit = function(req, res)
{

    res.end('<h1>User edit page </h1>')

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

    //Trying to find user with same email id
    User.findOne({email: req.body.email}, function(err, user){
        if(err)
        {
            console.log('Error in finding user in signing up');
            return
        }

        //When the user is not present
        if(!user)
        {
            User.create( req.body, function(err,user){
                    if(err){
                        console.log('Error in creating user while signing up');
                        return
                    }

                    return res.redirect('/users/sign-in')

            })
            
        }
        else
        {
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
        res.cookie('user_id', user.id); // Cookie creation 
        return res.redirect('/users/profile');
    
    }
    else //HANDLE USER NOT FOUND 
    {
        return res.redirect('back')
    }

});


}


module.exports.signOut= function(req, res){

    if(req.cookies.user_id) // Checking if cookie exists or not
    {
        res.clearCookie('user_id'); //removing the cookie
		return res.redirect('/users/sign-in')
    }
    else //If cookie does not exist redirect back to the same page
    {
        return res.redirect('/users/sign-in');
    }


}

