const { Router } = require('express');
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
router.post('/', usersPost);        


module.exports = router;