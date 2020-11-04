// libreria
const shortid = require("shortid");
// subida de archivos
const multer = require("multer");
// viene con node - elimina archivos
const fs = require("fs");
// modelo Enlaces
const Enlaces = require("../models/Enlace");

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
      res.status(500).json({ msg: "Hubo un error en la subida del archivo, intentalo de nuevo" });
      return next();
    }
  });
};

// TODO: Se usa en routes/enlaces.js cuando se obtiene un enlace
exports.eliminarArchivo = async (req, res) => {
  console.log(req.archivo);

  try {
    fs.unlinkSync(__dirname + `/../uploads/${req.archivo}`);
    console.log("archivo eliminado");
  } catch (error) {
    console.log(error);
  }
};

// Agregado cuando implementamos la interfaz de descargar archivo en el frontend
exports.descargarArchivo = async (req, res, next) => {
  // extraemos el archivo que se paso desde frontend por los parametros
  const nombre_archivo = req.params.archivo;
  // luego buscamos el archivo en la carpeta uploads, que tambien es la carpeta publica ahora
  // TODO: la carpeta uploads la habilitamos en el index en la linea 30
  // se busca el archivo en la carpeta uploads
  const archivo = __dirname + "/../uploads/" + nombre_archivo;

  // activamos la descarga y se descargara el archivo automaticamente!
  res.download(archivo);

  // TODO: eliminar el archivo y la entrada de la db

  // El primer paso es buscar el enlace relacionado con el archivo

  // TODO: lo filtramos por el nombre, ya que nombre_archivo es req.params.archivo debe ser igual a "nombre" de Enlaces.
  const enlace = await Enlaces.findOne({ nombre: nombre_archivo });
  //console.log(enlace)
  // A partir de aca ya tenemos el enlace y extraemos lo que necesitamos para borrar el enlace y el archivo
  const { descargas, nombre } = enlace;
  // Si las descargas son iguales a 1 -> Borrar entrada y borrar el archivo
  if (descargas === 1) {
    // Eliminar el archivo
    req.archivo = nombre; // inyectamos req.archivo a la req para que lo trate el TODO: archivosController.eliminarArchivo

    // para que pase al siguiente controllador que es de archivosController.eliminarArchivo
    next();

    // Eliminar la entrada de la db -> borrar el enlace
    await Enlaces.findOneAndRemove(enlace.id);
  } else {
    // Si las descargas son mayores a 1 -> Restar una descarga
    enlace.descargas--;
    await enlace.save();
    console.log("Aun hay descargas");
  }
};
