const { Router } = require('express');
const { check } = require('express-validator');
const { sunarpEventGet } = require('../controllers/sunarp.controller');

const router = Router();

router.get('/', sunarpEventGet);


module.exports = router;