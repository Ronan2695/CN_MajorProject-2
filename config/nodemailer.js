const nodemailer =  require('nodemailer');
const ejs = require('ejs');
const path= require('path');


//Defining the mail communication
let transporter = nodemailer.createTransport({

    service:'gmail',
    host:'smtp.gmail.com',
    port:587,
    secure: false,
    auth:{
        
        user:'rhtkmr000@gmail.com',
        pass:'RohitNannan@2695'
    }

});


// We need to define EJS for the mail.
 
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