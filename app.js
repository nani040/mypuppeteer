const express = require('express');
const app = express()
const bodyParser = require('body-parser')
// const routes = require('./routes/index')
const config = require('./config/config')
const port = process.env.PORT || config.port

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());


require('./routes/routes')(app)


app.listen(port,function(){ 
    console.log('server on port info: '+config.port)
    
});

// for test x=20
