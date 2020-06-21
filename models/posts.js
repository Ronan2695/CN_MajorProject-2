const mongoose= require('mongoose')

const postSchema = new mongoose.Schema({

   content:{
       type:String,
       required:true
   },
   //The post which is created should refer to the user schema.
   //We arer referring to the ObjectID
   user:{
       type: mongoose.Schema.Types.ObjectId,
       ref:'User' //We are referring to the userschema
   },

   //include the array of ids of all comments in the postSchema itself
   comments:[
 
    {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Comment'
    }

   ]

},{
    timestamps: true
});

const Post = mongoose.model('Post', postSchema);

module.exports= Post;