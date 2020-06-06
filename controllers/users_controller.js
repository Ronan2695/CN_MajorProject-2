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

//sign-in and create a session for the user

module.exports.createSession= function(req,res){

    return res.redirect('/')

}
