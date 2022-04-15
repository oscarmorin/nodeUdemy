const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');

  const usuariosGet = async (req = request, res = response) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };

    const [ total, usuarios ] = await Promise.all([
      Usuario.countDocuments(query),
      Usuario.find(query)
      .skip(Number( desde ))
      .limit(Number( limite ))

    ]);

    res.json({
       total,
       usuarios
    });
  }

  const usuariosPost = async (req = request , res = response) => {

    const { nombre, correo, contraseña, rol } = req.body;
    const usuario = new Usuario({ nombre, correo, contraseña, rol });

    //encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.contraseña = bcryptjs.hashSync( contraseña, salt );

    //Guardar en BD
    await usuario.save();

    res.json({
        usuario
    });
  }

  const usuariosPatch = (req, res = response) => {

    res.json({
        msg: 'patch API - Controlador'
    });
  }

  const usuariosPut = async(req, res = response) => {

    const { id } = req.params;
    const { _id, contraseña, google, correo, ...resto } = req.body;

    //TODO validar contra base de datos
    if ( contraseña ) {
    //encriptar la contraseña
      const salt = bcryptjs.genSaltSync();
      resto.contraseña = bcryptjs.hashSync( contraseña, salt );

    }

    const usuario = await Usuario.findByIdAndUpdate( id, resto );

    res.json(usuario);
  }

  const usuariosDelete = async (req, res = response) => {

    const { id } = req.params;

    //fisicamente lo borramos
    //const usuario = await Usuario.findByIdAndDelete( id );

    //Cambiar estado de usuario
    const usuario = await Usuario.findByIdAndUpdate(id, {estado: false } );

    res.json({
        id
    });
  }

  module.exports = {
      usuariosGet,
      usuariosPost,
      usuariosPut,
      usuariosPatch,
      usuariosDelete
  }