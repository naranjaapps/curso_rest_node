const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config')

class Server{

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.usersApi = '/api/usuarios';
        this.sunarpApi = '/api/sunarp';
        //middlewares

        this.databaseConnect();
        this.middlewares();
        this.routes();

    }

    async databaseConnect(){
        await dbConnection();
    }

    middlewares(){
        this.app.use(cors());

        //lectura y parseo
        this.app.use(express.json());

        this.app.use(express.static('public'));
    }

    routes(){

        this.app.use(this.usersApi, require('../routes/user.route'));
        this.app.use(this.sunarpApi, require('../routes/sunarp.route'));
     
    }

    listen(){
        this.app.listen(this.port, () =>{
            console.log(`corriendo en ${this.port}`);
        });        
    }
}

module.exports = Server;