const mongoose = require('mongoose');

const connectDb = async () => {
    try {
        const conn = await mongoose.connect(process.env.URI , {
            useUnifiedTopology:true,
            useNewUrlParser:true
        })
        console.log("mongodb connected")
    } catch (error) {
        console.error(`ERROR : ${error.message}`)
    }
};

module.exports  = connectDb;