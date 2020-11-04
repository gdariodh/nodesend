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
    res.status(500).json({ msg: "Hubo un error en la creacion del enlace" });
  }
};

// Obtener el enlace
exports.obtenerEnlace = async (req, res, next) => {
  const { url } = req.params;
  // verificar si existe el enlace
  console.log(url)
  const enlace = await Enlaces.findOne({ url });
  if (!enlace) {
    res.status(404).json({ msg: "El enlace no existe" });
    return next();
  }
  // Si existe
  res.json({ archivo: enlace.nombre });

  // que se vaya al siguiente controlador, obviamente si hay en algun caso alguno, TODO: si no hace nada.
  next()
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