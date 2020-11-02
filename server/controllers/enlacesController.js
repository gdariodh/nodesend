const Enlaces = require("../models/Enlace");
// libreria
const shortid = require("shortid");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");

exports.nuevoEnlace = async (req, res, next) => {
  // Revisar si hay errores
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }

  console.log(req.body)

  const { nombre_original, nombre } = req.body;

  // Crear un objeto de enlace
  const enlace = new Enlaces();
  enlace.url = shortid.generate();
  enlace.nombre = nombre;
  enlace.nombre_original = nombre_original;

  // Si el usuario esta Autenticado - rol de autenticado
  if (req.usuario) {
    const { password, descargas } = req.body;
    // asignar a enlace el numero de descargas
    if (descargas) {
      enlace.descargas = descargas;
    }
    if (password) {
      const salt = await bcrypt.genSalt(10);
      enlace.password = await bcrypt.hash(password, salt);
    }
    // Asignar el autor
    enlace.autor = req.usuario.id;
  }

  // Almacenar en la DB
  try {
    await enlace.save();
    return res.json({ msg: `${enlace.url}` });
    next();
  } catch (error) {
    console.log(error);
  }
};

// Obtener el enlace
exports.obtenerEnlace = async (req, res, next) => {
  const { url } = req.params;
  // verificar si existe el enlace
  const enlace = await Enlaces.findOne({ url });
  if (!enlace) {
    res.status(404).json({ msg: "El enlace no existe" });
    return next();
  }
  // Si existe
  res.json({ archivo: enlace.nombre });
  const { descargas, nombre } = enlace;
  // Si las descargas son iguales a 1 -> Borrar entrada y borrar el archivo
  if (descargas === 1) {
    // Eliminar el archivo
    req.archivo = nombre; // inyectamos req.archivo a la req
    // para que pase al siguiente controllador que es de archivosController
    next();
    // Eliminar la entrada de la db
    await Enlaces.findOneAndRemove(req.params.url);
  } else {
    // Si las descargas son mayores a 1 -> Restar una descarga
    enlace.descargas--;
    await enlace.save();
    console.log("Aun hay descargas");
  }
};

// obtiene un listado de todos los enlaces

exports.listadoEnlaces = async(req,res) => {
  try {
    // TODO: para traernos todos usamos el find({}) con un objeto vacio para que no haya filtro
                                          // select para que traiga solo las url
    const enlaces = await Enlaces.find({}).select('url -_id'); // -_id para quitar el id de la consulta
    res.json({enlaces})
  } catch (error) {
    console.log(error);
  }
}