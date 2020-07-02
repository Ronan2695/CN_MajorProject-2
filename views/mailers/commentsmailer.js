const nodeMailer = require('../config/nodemailer');

//creating a function which will send that mail.


exports.newComment = (comment) => {
    console.log('Inside new comment mailer');

    nodeMailer.transporter.sendMailer({
        from:"Rohit Nannan Tracker",
        to:comment.user.email,
        subject: "New Comment Published",
        html:'<h1>Comment is published</h1>'
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

