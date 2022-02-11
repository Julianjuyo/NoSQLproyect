// here wi will store the schema of the collection

const mongoose = require('mongoose');

const CountryModel = mongoose.model('Country', {
     name: {
        type: String,
        //it is requiere to have this data turoe
        required:true,
        //Not allow two countries with the same name
        unique: true
        },
        isoCode: {
            type: String
        }
    });

module.exports = CountryModel;
