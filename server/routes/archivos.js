const express = require("express");
// middleware que creamos
const auth = require("../middleware/auth"); // al auth inyecta a la req, permitiendo tener en el controlador (req.usuario)
// routing
const router = express.Router();
// controlador del endpoint
const archivosController = require("../controllers/archivosController.js");
// middleware que creamos, que se recibe el archivo subido, para luego tratarlo por los controllers

router.post("/", auth, archivosController.subirArchivo);

module.exports = router;
