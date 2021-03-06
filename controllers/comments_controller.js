const Comment= require('../models/comment');
const Post = require('../models/posts');
const { createPrivateKey } = require('crypto');
//Controller mailer action
const commentsMailer = require('../mailers/comments_mailer');
const queue = require('../config/kue');
const commentsEmailWorker = require('../workers/comment_email_worker');

//posting a comment
module.exports.create =async function(req,res){

    try{

        let post = await Post.findById(req.body.post);

        if (post){

            let comment = await Comment.create({
                content: req.body.content,
                post:req.body.post,
                user: req.user._id           
            });

            post.comments.push(comment);
            post.save();

                comment = await comment.populate('user', 'name email').execPopulate();
                //controller mailer action for comments
                //commentsMailer.newComment(comment);
               let job = queue.create('emails', comment).save(function(err){
                    if(err)
                    {
                        console.log('error in sending to the queue', err);
                        return;
                    }

                    console.log('Job enqueued',job.id);

                })
            if(req.xhr){

                    return res.status(200).json({

                        data:{

                            comment: comment

                        },

                        message: "Post created!"

                    });
            }

            req.flash('success', 'Comment Published');

            res.direct('/')

        }


    }catch(err){

        req.flash('error', err);
        return;

    }
  

}
 
module.exports.destroy = function(req,res){
    Comment.findById(req.params.id,function(err,comment){
        if(comment.user == req.user.id)
        {   
            //saving the postid
            let postId= comment.post;

            comment.remove();
            //need to pull out commentid from the list of comments
            //$pull is the native mongoDB syntax
            Post.findByIdAndUpdate(postId,{ $pull: {comments: req.params.id}},function(err,post){
                return res.redirect('back');
            })
            
        }
        else
        {
            return res.redirect('back');
        }

    });
}