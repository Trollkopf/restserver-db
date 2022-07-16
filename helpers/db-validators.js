const Role = require('../models/role')
const Usuario = require('../models/usuario')

const esRoleValido = async(rol = '')=>{
    const existeRol = await Role.findOne({rol});
    if(!existeRol){
        throw new Error(`El rol ${rol} no está registrado en la BD`)
    }
}

const emailExiste = async(correo = '')=>{
    const existeEmail = await Usuario.findOne({correo});
    if(existeEmail){
        throw new Error(`Ya existe un usuario con el correo electrónico ${ correo}`)
    }
}

const existeUsuarioPorID = async(id)=>{
    const existeUsuario = await Usuario.findById(id);
    if(!existeUsuario){
        throw new Error(`No existe ID: ${id} para ningún usuario`)
    }
}

module.exports = {
    esRoleValido,
    emailExiste,
    existeUsuarioPorID
}