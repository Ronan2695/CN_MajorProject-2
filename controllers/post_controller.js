const Post= require('../models/posts')
const Comments = require('../models/comment');


//Specifying async means we are declaring this function contains async statements 
    module.exports.create =  async function(req,res){

        try{

            let post = await Post.create({
                content:req.body.content,
                user:req.user._id
        
            });
            // We are checking for the xhr request and returning a success code if it is present
            if(req.xhr){
                return res.status(200).json({

                    data:{
                        
                    post:post

                    },
                 message:"PostCreated"
                });
            }


            req.flash('success', 'Post Published')
            return res.redirect('back');

        }catch(err){
            req.flash('error', err)
            return res.redirect('back');
        }
    
}


// We creating an action for deleting posts and comments.
//Specifying async means we are declaring this function contains async statements.

    module.exports.destroy = async function(req,res){
        //finding whether post exists in a DB or not.

            try{
                let post = await Post.findById(req.params.id);

                if(post.user == req.user.id)
                {
                    post.remove();
                    await Comments.deleteMany({post:req.params.id});   
                    
                    if(req.xhr){
                        return res.status(200).json({
                            data:{
                                post_id: req.params.id
                            },
                            message:"Post Deleted Successfully"
                        })
                    }


                    req.flash('success', 'Post and comments deleted');
                    return res.redirect('back');
                }
                else
                {
                    req.flash('err', 'You cannot delete this POST');
                    return res.redirect('back');     
                }
        

            }catch(err){
                req.flash('error', err)
                return res.redirect('back');   
            }       

        
        } 