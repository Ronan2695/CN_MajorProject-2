const User = require('../models/user') // We are importing the model.


//Redirecting back to the profile page after signing in
module.exports.profile = function(req,res)
{   
    User.findById(req.params.id, function(err, user){   
        return res.render('profile', {
        
            title:"CODIAL | Profile",
            profile_user:user  
        });
    }); 

    
}

//Update action
module.exports.update= function(req,res){
    if(req.user.id == req.params.id){
        User.findByIdAndUpdate(req.params.id,req.body, function(err, user){
            return res.redirect('back');
        });
    }
    else    
    {
        return res.status(401).send('Unauthorized');
    }
}


module.exports.edit = function(req, res)
{

    res.end('<h1>User edit page </h1>')

}

//signinpage
module.exports.signin = function(req, res){

    if(req.isAuthenticated())
    {
       return res.redirect('/users/profile')
    }

    return res.render('users_sign_in', {
        
        title:"CODIAL | SIGN IN"

    });

}

//signuppage
module.exports.signup = function(req, res)
{

    if(req.isAuthenticated())
    {
       return res.redirect('/users/profile')
    }


    return res.render('users_sign_up',{
        
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

//sign in
module.exports.createSession = function(req,res){

        return res.redirect('/')
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

module.exports.destroySession = function(req,res){

    req.logout(); //This function is given to req using passportjs

    return res.redirect('/')
}
