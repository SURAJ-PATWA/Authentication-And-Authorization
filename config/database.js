const mongoose = require('mongoose');
require('dotenv').config();     



exports.connect = () => {                          // conect  handler   route  export connect ke name per ho raha ha 
    mongoose.connect(process.env.MONGODB_URL)
        .then(() => {
            console.log("Connection Successful");
        })
        .catch((error) => {
            console.error("Connection failed:", error);
        });
};

