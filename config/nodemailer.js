const nodemailer =  require('nodemailer');
const ejs = require('ejs'); //For  rendering HTML templates in views
const path= require('path');
const env = require('./environment')


//Defining the mail communication, on which user you want to send the mail to
let transporter = nodemailer.createTransport(env.smtp);


// We need to deFine EJS for the mail.
 
let renderTemplate = (data, relativePath) => {
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname, '../views/mailers', relativePath),
        data,   
        function(err,template){
            if(err)
            {
                console.log('error in rendering template', err);
                return
            }
            mailHTML = template;
        }
    )

    return mailHTML;

} 


module.exports ={
    transporter : transporter,
    renderTemplate : renderTemplate

}