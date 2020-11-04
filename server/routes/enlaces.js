const express = require("express");
// middleware que creamos
const auth = require("../middleware/auth");
// routing
const router = express.Router();
// controlador del endpoint
const enlacesController = require("../controllers/enlacesController");
// primero el validator se usa antes del controllador del verbo del endpoint, y luego los mensajes en el controllador del verbo
const { check } = require("express-validator");

router.post(
  "/",
  [
    check("nombre", "Sube un archivo").not().isEmpty(),
    check("nombre_original", "Sube un archivo").not().isEmpty(),
  ],
  auth,
  enlacesController.nuevoEnlace
);

router.get("/", enlacesController.listadoEnlaces);

// un param es por ejemplo /:id y asi es opcional :/id?
router.get(
  "/:url",
  enlacesController.obtenerEnlace
);

module.exports = router;
