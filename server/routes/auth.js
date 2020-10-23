const express = require("express");
// middleware que creamos
const auth = require("../middleware/auth");
// routing
const router = express.Router();
// controlador del endpoint
const authController = require("../controllers/authController");
// primero el validator se usa antes del controllador del verbo del endpoint, y luego los mensajes en el controllador del verbo
const { check } = require("express-validator");

// verbos de endpoint de autenticacion
router.post(
  "/",
  [
    check("email", "Agrega un email valido").isEmail(),
    check("password", "El password no puede ir vacio").not().isEmpty(),
  ],
  authController.autenticarUsuario
);

router.get("/", auth, authController.usuarioAutenticado);

module.exports = router;
