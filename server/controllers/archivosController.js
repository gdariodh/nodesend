// libreria
const shortid = require("shortid");
// subida de archivos
const multer = require("multer");
// viene con node - elimina archivos
const fs = require("fs");

exports.subirArchivo = async (req, res, next) => {
  /* nota: req.usuario proviene del middleware auth, revisa la vigencia del token e inyecta a la request, req.usuario*/

  const configuracionMulter = {
    // si el usuario esta autenticado 10MB sino 1 MB
    limits: { fileSize: req.usuario ? 1024 * 1024 * 10 : 1024 * 1024 },
    storage: (fileStorage = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, __dirname + "/../uploads");
      },
      filename: (req, file, cb) => {
        // substring es una fn que te ayuda a recortar la parte del string que necesitas, lastIndexOf -> el ultimo punto "."
        const extension = file.originalname.substring(
          file.originalname.lastIndexOf("."),
          file.originalname.length
        );
        cb(null, `${shortid.generate()}${extension}`);
      },
    })),
  };

  const upload = multer(configuracionMulter).single("archivo");

  upload(req, res, async (error) => {
    console.log(req.file);
    if (!error) {
      res.json({ archivo: req.file.filename });
    } else {
      console.log(error);
      return next();
    }
  });
};

exports.eliminarArchivo = async (req, res) => {
  console.log(req.archivo);

  try {
    fs.unlinkSync(__dirname + `/../uploads/${req.archivo}`);
    console.log("archivo eliminado");
  } catch (error) {
    console.log(error);
  }
};
