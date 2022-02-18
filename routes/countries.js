const express = require('express');
const ContinentModel = require('../models/Continent');
const router = express.Router()

const CountryModel = require('../models/Country')


//------------------------
//Countries methods
//------------------------

//post to create
router.post('/countries', async (request,response)=>{

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
router.get('/', async (request,response)=>{

    const countries = await CountryModel.find().populate('continent');
    response.status(200).json(countries)

});


//get one country
router.get('//:id', async (request,response)=>{

    //get the parameter of the country in the id
    const countryId = request.params.id

    const countries = await CountryModel.findOne({
        _id: countryId
    });

    response.status(200).json(countries)

});


// to delete a country
router.delete('/:id',async (request,response) => {

    const countryId = request.params.id;

    await CountryModel.findOneAndDelete({
        _id: countryId
    })
    response.status(200).json({msg:"Country well deleted"})

});

// to update  a country
router.put('/countries/:id',async (request,response) => {

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
router.get('/Number', async (request,response)=>{

    const countryId = request.params.id;
    const countries = await CountryModel.count();
    response.status(200).json(countries)

});

//------------------------
// POINT 1
//------------------------
//Send back all the country with a name started by a string given by the user
router.get('/Start/:id', async (request,response)=>{

    const countryId = request.params.id;

    const countries = await CountryModel.find({
        
        name: { '$regex': '(\s+'+countryId+'|^'+countryId+')', '$options': 'i' }}
    , {});

    response.status(200).json(countries)

});


//------------------------
// POINT 6
//------------------------

//Get all the countries order by number of people first the less populated and last the most populated

router.get('/sort', async (request,response)=>{

    const countries = await CountryModel.find().sort('population')

    response.status(200).json(countries)

});


module.exports = router;
