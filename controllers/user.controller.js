const {response, request} = require('express');

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
 
  const usersPost = (req, res=response) => {
    const {license_plate} = req.body;

    res.json({
        msg : 'POST  api - Controlador',
        license_plate : license_plate

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