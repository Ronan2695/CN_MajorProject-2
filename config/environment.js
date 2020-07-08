const fs= require('fs');
const rfs= require('rotating-file-stream');
const path = require('path');

//defining where the logs will be stored
const logDirectory =path.join(__dirname,'../production_logs')
//Checking if the log directory exists.
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const accessLogStream = rfs.createStream('access.log',{

    interval:'1d',
    path:logDirectory
    
})



//env variables defined for development
const development = { 

    name: 'development', 
    asset_path: '/assets', 
    session_cookie_key:'blahsomething', 
    db:'codial_development', 
    
    smtp:{ 
        service:'gmail', 
        host:'smtp.gmail.com', 
        port:587, 
        secure: false, 
        auth:{ 

            user:'rhtkmr000', 
            pass:'AdrollNocEngineer@2695' 

        } 

    }, 

    google_client_id:"117684921685-9qgipbpia3rclvhj5sasbir2e8qk4l2j.apps.googleusercontent.com", 
    google_client_secret:"Qdwtp3Dpaw0dpfqV7MycNwlx", 
    google_call_back_url:"http://localhost:8000/users/auth/google/callback", 
    jwt_secret:'codeial' ,
    morgan:{
        node:'dev',
        options: {stream:accessLogStream}
    }


} 

//env variables defined for production
//they will be stored in a separate file.
const production = {

    name: 'production',
    asset_path: process.env.CODEIAL_ASSET_PATH,
    session_cookie_key:process.env.CODEIAL_SESSION_KEY,
    db:process.env.CODEIAL_DB,
    smtp:{
        service:'gmail',
        host:'smtp.gmail.com',
        port:587,
        secure: false,
        auth:{
            user:process.env.CODEIAL_GMAIL_USERNAME,
            pass:process.env.CODEIAL_GMAIL_PASSWORD
        }
    
    },

    google_client_id:process.env.GOOGLE_CLIENT_ID,
    google_client_secret:process.env.GOOGLE_CLIENT_SECRET,
    google_call_back_url:process.env.GOOGLE_CALLBACK_URL,
    jwt_secret:process.env.CODEIAL_JWT_SECRET,
    morgan:{
        node:'combined',
        options: {stream:accessLogStream}
    }

}


module.exports = eval(process.env.CODEIAL_ENVIRONMENT)== undefined ? development : eval(process.env.CODEIAL_ENVIRONMENT);

//module.exports = development;