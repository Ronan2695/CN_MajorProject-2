const nodeMailer = require('../../config/nodemailer');

//creating a function which will send that mail.
// Whenever comment is made, the mailer needs to be called

exports.newComment = (comment) => {
    
    let htmlstring = nodeMailer.renderTemplate({comment:comment}, '/comments/new_comment')

    nodeMailer.transporter.sendMailer({
        from:"rhtkmr000@gmail.com",
        to:comment.user.email,
        subject: "New Comment Published",
        html:htmlstring
    }, (err,info) =>  {

        if(err)
        {
            console.log('Error in sending mail',err);
            return;
        }

        console.log("Message Sent", info)
        return;
    });

}

