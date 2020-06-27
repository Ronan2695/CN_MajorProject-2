const Post = require('../models/posts');
const User = require('../models/user');


//Specifying async means we are declaring this function contains async statements. 
module.exports.home= async function(req,res)
{

    // Post.find({}, function(err,posts){
    //     return res.render('home',{
    //         title:"Home",
    //         posts: posts
    //      });

    // });

    // For Handling Errors 

    try{
        //we are populating the users from the User Schema 
    //Finding all the posts and populating user of each post
        let posts = await Post.find({})
        .sort('-createdAt')
        .populate('user')
        .populate({
            path:'comments',
            populate:{
                path:'user'
            }
        });
        
        let users = await User.find({});
        
        //We are sending all the posts and users. 
        return res.render('home',{
            title:"Home",
            posts: posts,
            all_users:users
        });


    } catch(err){
        console.log('Error',err);
    }

    
} 


    //using then
    //Post.find({}).populate('comments').then(function()); // this is not a promise
    //let posts = Post.find({}).populate('comments').exec();
    //When this query should be executed you can say posts.then()
    //posts.then() // This is how a promise works


//module.exports.actionName = function(req,res){}


module.exports.about= function(req,res)
{
    return res.end('<h1>About Page</h1>')
} 

module.exports.info= function(req,res)
{
    return res.end('<h1>info Page</h1>')
} 


