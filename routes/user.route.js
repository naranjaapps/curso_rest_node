const { Router } = require('express');
const { check } = require('express-validator');
const { usersGet, 
        usersDelete, 
        usersPatch, 
        usersPost, 
        usersPut} = require('../controllers/user.controller');

const router = Router();

router.get('/', usersGet);        
router.put('/:id', usersPut);        
router.delete('/', usersDelete);        
router.patch('/', usersPatch);        
router.post('/', [
        check('correo', 'El correo no es valido').isEmail()], 
        usersPost);        


module.exports = router;