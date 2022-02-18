
const { response } = require('express');
const express = require('express');

const req = require('express/lib/request');
const { request } = require('http');

require('dotenv').config();
require('./conf/database');


//Conection to the routes
const CountriesRoutes = require('./routes/countries')
const ContinentsRoutes = require('./routes/continents')

//Create of the routes.
const app = express()
app.use(express.json());
app.use('/countries', CountriesRoutes)
app.use('/Continents', ContinentsRoutes)




//------------------------
// Exra methods
//------------------------

//get a mesage 
app.get('/', (request,response) =>{
    response.status(200).json({msg: "it works ! "})
});

//TO listen in a portal
const port = 3000

app.listen(port,() =>{
    console.log('server running on http://localhost:'+port);
});
