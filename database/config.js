const mongoose = require('mongoose');


const dbConnection = async()=>{

    try{
        await mongoose.connect(process.env.MONGODB_ATLAS);

        console.log('Listo Db');



    }catch(error){
        throw new Error('error en cargar la BD');
    }


}

module.exports = {
    dbConnection
}