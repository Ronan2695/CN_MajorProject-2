const Post= require('../models/posts')
const Comments = require('../models/comment');

module.exports.create =  function(req,res){

    Post.create({
        content:req.body.content,
        user:req.user._id

    }, function(err,post){
        if(err)
        {
            console.log('error in creating a post');
            return;

        }

        return res.redirect('back');

    });
     
}


// We creating an action for deleting posts and comments.
module.exports.destroy =  function(req,res){
    //finding whether post exists in a DB or not.
    Post.findById(req.params.id, function(err,posts){
        //authorization
        //checking whether the user it is the user who was written the post
        //.id means converting the object id into string.
        
        if(posts.user == req.user.id)
        {
            post.remove();
            Comments.deleteMany({post:req.params.id}, function(err){
                return res.redirect('back');
            });
        }
        else
        {
            return res.redirect('back');     
        }

    });
} 