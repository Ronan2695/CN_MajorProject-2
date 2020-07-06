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
    jwt_secret:'codeial'
}

const production ={

    name:'production'

}

module.exports = development;