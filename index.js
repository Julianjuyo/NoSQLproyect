const { response } = require('express');
const express = require('express');
const req = require('express/lib/request');
const { request } = require('http');

require('dotenv').config();
require('./conf/database');

const app = express()

//To get data of the body 
app.use(express.json());

//Conection to the data base
const CountryModel = require('./models/Country')


//post to create
app.post('/countries', async (request,response)=>{

    // to check the data from the user
    console.log(request.body);

    //to get the variables in one
    const {name, isoCode} = request.body

    
    const country = await CountryModel.create({
        name: name,
        isoCode: isoCode
    });
    response.status(200).json(country)
});


//get all the countries 
app.get('/countries', async (request,response)=>{

    const countries = await CountryModel.find();
    response.status(200).json(countries)

});


//get one country
app.get('/countries/:id', async (request,response)=>{

    //get the parameter of the country in the id
    const countryId = request.params.id

    const countries = await CountryModel.find({
        _id: countryId
    });

    response.status(200).json(countries)

});


// to delete a country
app.delete('/countries/:id',async (request,response) => {

    const countryId = request.params.id;

    await CountryModel.findOneAndDelete({
        _id: countryId
    })
    response.status(200).json({msg:"Country well deleted"})

});

// to update  a country
app.put('/countries/:id',async (request,response) => {

    const countryId = request.params.id;

    //to get the variables in one
    const {name, isoCode} = request.body

    const country = await CountryModel.findOneAndUpdate({
        _id: countryId
    }
    ,{
        name,
        isoCode
    },{
        new: true
    });

    response.status(200).json(country)

});


//Get the number of countries in the data base.

app.get('/countriesNumber', async (request,response)=>{

    const countryId = request.params.id;
    const countries = await CountryModel.count();
    response.status(200).json(countries)

});

//Send back all the country with a name started by a strung given by the user

app.get('/countriesStart/:id', async (request,response)=>{

    const countryId = request.params.id;

    const countries = await CountryModel.find({
        
        name: { '$regex': '(\s+'+countryId+'|^'+countryId+')', '$options': 'i' }}
    , {});

    response.status(200).json(countries)

});



//get a mesage 
app.get('/', (request,response) =>{
    response.status(200).json({msg: "it works ! "})
});


//TO listen in a portal
const port = 3000
app.listen(port,() =>{
    console.log('server running on http://localhost:'+port);
});
