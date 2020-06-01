const express = require('express');
const expressLayouts= require('express-ejs-layouts'); // requiring the layouts library
const app = express();
const port=8000; //In production, ports run on 80
const db= require('./config/mongoose')


//setup the view engine
app.set('view engine','ejs');

app.set('views','./views');
app.use(expressLayouts); //Acquiring expressLayouts

//extract style and scripts from subpages into the layout.
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

app.use(express.static('./assets')); //Accessing our static files

//accessing the main route file
app.use('/', require('./routes/index'));




app.listen(port, function(err){

    if(err)
    {
        console.log(`Error in running the server: ${err}`); //Interpolation
    }

    console.log(`Server is running on port:${port}`);

})



