const { response } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/generar-jwt');
const { googleVerify } = require('../helpers/google-verify')

const login = async (req, res = response) => {

    const { correo, password } = req.body;

    try {

        //verificar si el email existe
        const usuario = await Usuario.findOne({ correo });

        if ( !usuario ) {
            return res.status(400).json({
                msg: ' Usuario / Password no son correctos - Correo'
            })
        } 

        //si el usuario esta activo
        if ( !usuario.estado ) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - estado: False'
            })
        }

        //verificar la contraseña 
        const validPassword = bcryptjs.compareSync( password, usuario.contraseña );
        if ( !validPassword ) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - Password'
            })
        }

        //generar JWT
        const token = await generarJWT ( usuario.id );


        res.json ({
            usuario,
            token
        })
        
    } catch (error) {
        console.log(error)
        return res.status(500).json ({
            msg: 'Hable con el administrador'
        })
    }

}

const googleSignIn = async( req, res = response ) => {
   
    const { id_token } = req.body;

    try {

        const { correo, nombre, img } = await googleVerify( id_token );

        let usuario = await Usuario.findOne({ correo });      
        
        //Si el usuario no extiste
        if ( !usuario ){
            
            //Tengo que crearlo
            const data = {
                nombre,
                correo,
                contraseña: ':p',
                img,
                rol: "USER_ROLE",
                google: true
            };

            usuario = new Usuario( data );
            await usuario.save();
        }

        if ( !usuario.estado ) {
            return res.status(401).json({
                msg: 'Hable con el administrado, usuario bloqueado'
            });
        }

        //Generar JWT
        const token = await generarJWT( usuario.id );

        res.json ({
            usuario,
            token
        });

    } catch (error) {

        res.status(400).json({
            ok: false,
            msg: 'El token no se pudo verificar'
        });
        
    }

}


module.exports = {
    login,
    googleSignIn
}