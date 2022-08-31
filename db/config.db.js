const mongoose = require('mongoose');
const colors = require('colors');

const dbConn = async()=>{

    const dbconnection = process.env.MONGODB_CNN;

    try {
        
        await mongoose.connect(dbconnection, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            //####### NO LONGER SUPPORTED OPTIONS #######
            // useCreateIndex: true,
            // useFindAndModify: true
        })

        console.log(' /-- Base de datos online --/ '.bgGreen.bold);

    } catch (error) {
        console.log(error);
        throw new Error('Error a la hora de iniciar la DB');
    }


}

module.exports ={
    dbConn
}