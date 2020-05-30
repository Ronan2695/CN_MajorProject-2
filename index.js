const express = require('express');

const app = express();
const port=8000; //In production, ports run on 80


app.use('/', require('./routes/index'));

app.listen(port, function(err){

    if(err)
    {
        console.log(`Error in running the server: ${err}`); //Interpolation
    }

    console.log(`Server is running on port:${port}`);

})



