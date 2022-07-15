const express = require('express');
const cors = require('cors');
const { dbConn } = require('../db/config.db');

class Server {

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosRoutePath = '/api/users';

        //Conectar a base de datos
        this.conectarDB();

        //Middlewares
        this.middlewares();

        //rutas de mi aplicación
        this.routes();
    }

    async conectarDB(){
        await dbConn();
    }

    middlewares(){

        //CORS
        this.app.use(cors());

        // Lectura y parseo del body
        this.app.use( express.json());

        //Directorio Público
        this.app.use(express.static('public'));
    }
    
    routes(){
        
        this.app.use(this.usuariosRoutePath, require('../routes/user.routes'));   

    }
    
    listen(){
        this.app.listen(this.port, ()=>{
            console.log(`Servidor corriendo en el puerto ${this.port}`)
        })
    }
}

module.exports = Server;