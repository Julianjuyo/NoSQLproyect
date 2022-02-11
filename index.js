const { response } = require('express');
const express = require('express');
const { request } = require('http');

require('dotenv').config();

require('./conf/database');


const app = express()

app.get('/', (request,response) =>{
    response.status(200).json({msg: "it works ! "})
});


app.get('/todos', (request,response) =>{
    response.status(200).json({msg: "The mesage works"})
});

const port = 3000
app.listen(port,() =>{
    console.log('server running on http://localhost:'+port);
});
