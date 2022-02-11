
//to connect the database
const mongoose = require('mongoose');

//url of the cluster
//mongoose.connect('mongodb+srv://EpitaNoSQLDB:juyo7294@cluster0.w97ub.mongodb.net/test?authSource=admin&replicaSet=atlas-bhl33d-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true');

// , callback = error
mongoose.connect(process.env.MONGO_URL,{},(error)=>{
    
    if (error) throw error;
    console.log("connected to db !");
});



