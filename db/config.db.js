const mongoose = require('mongoose');
const colors = require('colors');

const dbConn = async()=>{

    const dbconnection = 'mongodb+srv://user_node_cafe:uFV9aQXtxLT1T8t9@miclustercafe.hu0lkff.mongodb.net/cafeDB';

    try {
        
        await mongoose.connect(dbconnection, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            //####### NO LONGER SUPPORTED OPTIONS #######
            // useCreateIndex: true,
            // useFindAndModify: true
        })

        console.log(' /-- Base de datos online --/ '.bgWhite.bold);

    } catch (error) {
        console.log(error);
        throw new Error('Error a la hora de iniciar la DB');
    }


}

module.exports ={
    dbConn
}