const nodeMailer = require('../config/nodemailer');

//this is another way of exporting a method
exports.newComment = (comment) => {

    console.log('inside newComment mailer');

    //sender mail details
    nodeMailer.transporter.sendMail({

        from:'tracker',
        //sending it to the user who has commented
        to: comment.user.email,
        subject:"New Comment Published!",
        html:'<h1>Yup, your comment is now published</h1>'
    //call back incase there was an error
    },(err,info) => {

        if(err){

            console.log("Error in sending mail", err);
            return;
        }
        console.log('Message sent', info);
        return;
    });
}