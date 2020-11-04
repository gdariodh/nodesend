const express = require("express");
// middleware que creamos
const auth = require("../middleware/auth"); // al auth inyecta a la req, permitiendo tener en el controlador (req.usuario)
// routing
const router = express.Router();
// controlador del endpoint
const archivosController = require("../controllers/archivosController.js");
// middleware que creamos, que se recibe el archivo subido, para luego tratarlo por los controllers

router.post("/", auth, archivosController.subirArchivo);

// TODO: implementamos a la hora de poner para descargar en la interfaz del frontend con nextjs

// descarga un archivos
router.get("/:archivo", 
archivosController.descargarArchivo,
archivosController.eliminarArchivo
);

module.exports = router;
