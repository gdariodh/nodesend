const express = require('express');
// routing 
const router = express.Router();
// controlador del endpoint
const usuarioController = require('../controllers/usuarioController');
// primero el validator se usa antes del controllador del verbo del endpoint, y luego los mensajes en el controllador del verbo
const { check } = require('express-validator')
// endpoints - rutas de /api/usuarios
router.post('/',
[
   check('nombre','El nombre es Obligatorio').not().isEmpty(),
   check('email','Agrega un email valido').isEmail(),
   check('password','Password debe ser de al menos 6 caracteres').isLength({min:6})
],
   usuarioController.nuevoUsuario
);

module.exports = router;