
const express = require('express')
const router = express.Router()


const ContinentModel = require('../models/Continent')


//------------------------
// Continent methods
//------------------------

//post to create
router.post('/', async (request,response)=>{

    // to check the data from the user
    console.log(request.body);

    //to get the variables in one
    const {name, countries} = request.body

    
    const continent = await ContinentModel.create({
        name: name,
        countries: countries
    });

    response.status(200).json(continent)
});


//get all the continents 
router.get('/', async (request,response)=>{

    const continents = await ContinentModel.find().populate('countries');
    response.status(200).json(continents)

});


//------------------------
// POINT 3
//------------------------
//get all the continents with there number of countries 
router.get('/number', async (request,response)=>{

    const continents = await ContinentModel.aggregate([{

        $project: { name:1 , count: { $size:"$countries" }}
    }])
    response.status(200).json(continents)

});

//------------------------
// POINT 7
//------------------------

//get all the continents that have in their name a u and the population is bigger than 100,000
router.get('/biggerthan100000', async (request,response)=>{

    const continents = await ContinentModel.find().
    populate({
        path: 'countries',
        match: {population: { $gte: 100000} },
    
        match:{"name" : {$regex : "u"}} 
    })
    response.status(200).json(continents)

});


//------------------------
// POINT 4
//------------------------
//Send back the fourth countries of a continent bv alphabetic order (by country)
router.get('/sort4countries/:id', async (request,response)=>{

    const ContinentId = request.params.id;

    const continents = await ContinentModel.findOne({
        name: ContinentId
    }).
    populate({
        path: 'countries',
        options: { sort: { 'name': 1 }, limit: 4 }
    })

    response.status(200).json(continents)

});


module.exports = router;
