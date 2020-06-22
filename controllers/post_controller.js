const Post= require('../models/posts')
const Comments = require('../models/comment');


//Specifying async means we are declaring this function contains async statements 
    module.exports.create =  async function(req,res){

        try{

            await Post.create({
                content:req.body.content,
                user:req.user._id
        
            });
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