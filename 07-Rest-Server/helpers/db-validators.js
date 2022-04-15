const  Role  = require('../models/role');
const Usuario = require('../models/usuario');

const esRolValido = async(rol = '') => {
    const existeRol = await Role.findOne({ rol });
    if ( !existeRol ) {
      throw new Error(`El rol ${ rol } no está registrado en la BD`)
    }
}

//verificar si el correo existe
const validarEmail = async ( correo = '' ) => {
    const existeEmail = await Usuario.findOne({ correo });

    if ( existeEmail ) {
        throw new Error (`Este correo: ${correo} ya esta registrado`)      
    }
}

//verificar si el usuario existe por id
const existeUsuarioPorId = async ( id ) => {
    
    const existeUsuario = await Usuario.findById(id);

    if ( !existeUsuario ) {
        throw new Error (`El ID: ${ id } no existe`)
    }
}

module.exports = {
    esRolValido,
    validarEmail,
    existeUsuarioPorId
}