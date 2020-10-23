const Usuario = require("../models/Usuario");
// librerias
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
// variables env
require("dotenv").config({ path: "variables.env" });

exports.autenticarUsuario = async (req, res, next) => {
  // revisar si hay errores
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }

  // buscar el usuario si esta registrado
  const { email, password } = req.body;
  const usuario = await Usuario.findOne({ email });

  if (!usuario) {
    // 401 significa que las credenciales estan mal
    res.status(401).json({ msg: "El usuario no existe" });
    return next(); // deja de ejecutar
  }

  // verificar y comparar password y si es correcto => autenticar el usuario
  if (bcrypt.compareSync(password, usuario.password)) {
    // Crear JWT
    const token = jwt.sign(
      {
        nombre: usuario.nombre,
        id: usuario._id,
        email: usuario.email,
      },
      process.env.SECRETA,
      {
        expiresIn: "8h",
      }
    );

    res.json({ token });
    
  } else {
    res.status(401).json({ msg: "Password incorrecto, intentalo otra vez" });
    return next();
  }
};

/* luego de la creacion del token, creamos un middleware que hace un get del usuario autenticado
 el middleware esta en ../middleware/auth.js, el middleware nos ayuda a enviar informacion privada 
 por la misma respuesta en vez de por el body, de modo que el usuario no pueda manipular*/

exports.usuarioAutenticado = (req,res,next) => {

    res.json({usuario:req.usuario});
}