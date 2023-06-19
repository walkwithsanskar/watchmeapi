const mongoose = require("mongoose");
require("dotenv").config();
dbConnect = ()=>{
        mongoose.connect(process.env.DATABASE_URL,{
            useNewUrlParser:true,
            useUnifiedTopology:true
        }).then(()=>{
            console.log("database connection successfull");
        }).catch((error)=>{
            console.log(error);
            console.log("error couldn't connect to database");
        })
}

module.exports = dbConnect;