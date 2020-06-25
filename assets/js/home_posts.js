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
                        console.log(data)
                    }, error:function(error){
                        console.log(error.responseText);
                    }
                });
         });
    }



    createPost();
}


// method to create a POST in DOM