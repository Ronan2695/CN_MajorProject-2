{
    //Method to submit the form data for new post using AJAX
    let createPost = function(){
        
            let newPostForm = $('#new-post-form');

            newPostForm.submit(function(e){
                //This prevents the form data to be parsed, so the data can be passed as Ajax
                e.preventDefault();

                $.ajax({
                    type:'post',
                    url:"/posts/create",
                    // this converts the form data into JSON
                    data:newPostForm.serialize(),
                    success: function(data){
                        let newPost = newPostDom(data.data.post);
                        $('#posts-list-container>ul').prepend(newPost);
                    }, error:function(error){
                        console.log(error.responseText);
                    }
                });
         });
    }



 



// method to create a POST in DOM

let newPostDom=function(post){

    return $(`<li id="post-${post._id}">
            <p>
        
            <!-- Delete button for posts -->
            <small> 
                <a class="delete-post-button" href="/posts/destroy/${post._id}">X</a> 
            </small>
 
            ${post.content}
            <br>
            <small>
            ${post.user.name}
            </small>
            </p>
        <!-- Comments -->
        <div class="post-comments">

                <form action="/comments/create" method="POST">
                    
                    <input type="text" name="content" placeholder="Add Comment" required>
                    <!-- Next we need to send the ID of the post to which the comment must be added. -->
                    <input type="hidden" name="post" value="${post._id}">
                    <input type="submit" value="Add Comment">

                </form>
                

            <div class="post-comments-list">
                <ul id="post-comments-${post._id}">

                   

                </ul>


            </div>

        </div>

    </li>  `)


    }
    createPost();

}
