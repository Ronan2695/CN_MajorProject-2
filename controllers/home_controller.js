module.exports.home= function(req,res)
{   
    console.log(req.cookies);
    res.cookie('user_id', 25);
    return res.render('home',{

        title:"Home"

    });
} 

//module.exports.actionName = function(req,res){}


module.exports.about= function(req,res)
{
    return res.end('<h1>About Page</h1>')
} 

module.exports.info= function(req,res)
{
    return res.end('<h1>info Page</h1>')
} 


