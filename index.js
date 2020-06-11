const express = require('express');
const cookieParser = require('cookie-parser');
const expressLayouts= require('express-ejs-layouts'); // requiring the layouts library
const app = express();  
const port=8000; //In production, ports run on 80
const db= require('./config/mongoose')

//used for session cookie
const session = require('express-session');
const passport= require('passport');
const passportLocal = require('./config/passport-local-strategy')
//This library requires an arguement for storing session information in the DB
const MongoStore = require('connect-mongo')(session);
const sassMiddleware = require('node-sass-middleware');

app.use(sassMiddleware({
    src: './assets/scss',
    dest:'./assets/css',
    debug:true,
    outputStyle:'extended',
    prefix:'/css'
}));

app.use(express.urlencoded());
app.use(cookieParser());

//Accessing our static files
app.use(express.static('./assets')); 

//Acquiring expressLayouts
app.use(expressLayouts); 
//extract style and scripts from subpages into the layout.
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);



//setup the view engine
app.set('view engine','ejs');
app.set('views','./views');

//session-definition.
//we are creating a new cookie with the following parameters.
//mongo store is used to store the session cookie in the db.
app.use(session({ 
    name:'codial',
    //TODO change the secret before deployment in production mode
    secret: 'blahsomething', // Your cookie data will be encrypted using this string--> Similar to hashing
    saveUninitialized:false,
    cookie: {
        maxAge: (1000 * 60 * 100) // the first value is ms
    },
store: new MongoStore(
        {
            mongooseConnection: db,
            autoremove: 'disabled'
        },
        function(err)
        {
            console.log(err || 'connect-mongodb setup ok')
        }
    )
}))


app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser); // we have defined a middlware manually in passport-local-strategy

//accessing the main route file
app.use('/', require('./routes/index'))


app.listen(port, function(err){

    if(err)
    {
        console.log(`Error in running the server: ${err}`); //Interpolation
    }

    console.log(`Server is running on port:${port}`);

})



