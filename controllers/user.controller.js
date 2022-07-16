const { response, request } = require('express');
const bcrypt = require('bcryptjs');

const Usuario = require('../models/usuario');

const usuariosGet = ('/', async(req = request , res = response)=>{

    const {limite = 5, desde = 0} = req.query;
    const activo = {estado: true};

    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(activo),
        Usuario.find(activo)
        .limit(Number(limite))
        .skip(Number(desde))

    ])

    res.json({total, usuarios});
})

const usuariosPost = async(req, res = response)=>{

    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario( {nombre, correo, password, rol} );

    //HASH CONTRASEÑA
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt);

    //GUARDAR EN DB
    await usuario.save();

    res.json({
        usuario
    });
}

const usuariosPut = async(req, res = response)=>{
    const {id} = req.params;
    const{ _id, password, google, ...resto } = req.body;

    //TODO: Validar contra DB
    if(password){
        const salt = bcrypt.genSaltSync();
        resto.password = bcrypt.hashSync(password, salt); 
    }

    const usuario = await Usuario.findByIdAndUpdate( id, resto);

    res.json({
        msg: 'Datos actualizados!',
        usuario
    });
}

const usuariosPatch = (req, res = response)=>{
    res.json({
        msg: 'patch API! - controlador'
    });
}

const usuariosDelete = async(req, res = response)=>{

    const{id} = req.params;

    //BORRAR USUARIO DE LA BD
    // const usuario = await Usuario.findByIdAndDelete(id);

    //CAMBIAR EL ESTADO PARA NO PERDER INFORMACION DEL USUARIO
    const usuario = await Usuario.findByIdAndUpdate(id, {estado: false});

    res.json({usuario});
}




module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
}