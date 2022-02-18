// here wi will store the schema of the collection CONTINENT

//------------------------
// POINT 2
//------------------------

const mongoose = require('mongoose');

const ContinentModel = mongoose.model('Continent', {
     name: {
        type: String,
        //it is requiere to have this data turoe
        required:true,
        //Not allow two countries with the same name
        unique: true
        },
        countries: [{ 
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Country'
        }]
    });

module.exports = ContinentModel;

