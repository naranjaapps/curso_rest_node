const {response, request} = require('express');
const puppeteer = require('puppeteer');
const Usuario = require('../models/user');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');

const usersGet = (req = request, res=response) => {

    const {api} = req.query;

    res.json({
        msg : 'GET api - Controlador',
        api : api
    });
  }        

  const usersPut = (req, res=response) => {

    const {id} = req.params;

    res.json({
        msg : 'PUT  api - Controlador',
        id : id
    });
  }
 
   const usersPost = async (req, res=response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()){
        return res.status(400).json(errors);
    }

    const {nombre, correo, contrasena, rol} = req.body;
    const usuario = new Usuario({nombre, correo, contrasena, rol});

    //verificar correo
    const existeEmail = Usuario.findOne({correo});
    if (existeEmail) {

      return res.status(400).json({  
        msg : 'El correo ya existe',
    });

       
    }

    //encriptar
    const salt = bcryptjs.genSaltSync(10);
    usuario.contrasena = bcryptjs.hashSync(contrasena, salt);

    await usuario.save();

    res.json({  
        msg : 'POST  api - Controlador',
        usuario : usuario
    });
  }

  const usersDelete = (req, res=response) => {
    res.json({
        msg : 'DELETE  api - Controlador'
    });
  }

  const usersPatch = (req, res=response) => {
    res.json({
        msg : 'PATCH  api - Controlador'
    });
  }
  


  module.exports = {
    usersGet,
    usersPut,
    usersPatch,
    usersPost,
    usersDelete
  }