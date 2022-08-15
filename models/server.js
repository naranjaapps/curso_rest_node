const express = require('express');
const cors = require('cors');

class Server{

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.usersApi = '/api/usuarios';
        //middlewares

        this.middlewares();
        this.routes();

    }

    middlewares(){
        this.app.use(cors());

        //lectura y parseo
        this.app.use(express.json());

        this.app.use(express.static('public'));
    }

    routes(){

        this.app.use(this.usersApi, require('../routes/user.route'));
     
    }

    listen(){
        this.app.listen(this.port, () =>{
            console.log(`corriendo en ${this.port}`);
        });        
    }
}

module.exports = Server;