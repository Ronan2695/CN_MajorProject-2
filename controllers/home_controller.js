const Post = require('../models/posts');
const User = require('../models/user');

module.exports.home= function(req,res)
{

    // Post.find({}, function(err,posts){
    //     return res.render('home',{
    //         title:"Home",
    //         posts: posts
    //      });

    // });

    //we are populating the users from the User Schema 
    //Finding all the posts and populating user of each post
    Post.find({})
    .populate('user')
    .populate({
        path:'comments',
        populate:{
            path:'user'
        }
    })
    .exec(function(err,posts  ){

        User.find({}, function(err,users){
            //We are sending all the posts and users. 
            return res.render('home',{
                title:"Home",
                posts: posts,
                all_users:users
             });
    
        });
        
        
    })
    
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


