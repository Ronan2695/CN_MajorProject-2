const nodeMailer = require('../config/nodemailer');

//this is another way of exporting a method
exports.newComment = (comment) => {

    let htmlString = nodeMailer.renderTemplate({comment:comment}, '/comments/new_comment.ejs')

    //sender mail details
    nodeMailer.transporter.sendMail({

        from:'tracker',
        //sending it to the user who has commented
        to: comment.user.email,
        subject:"New Comment Published!",
        html:htmlString
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