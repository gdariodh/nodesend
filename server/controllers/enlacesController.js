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

  console.log(req.body);

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

// TODO: middleware que se ejecuta antes de obtenerEnlace, verifica si el enlace tiene password
exports.tienePassword = async (req, res, next) => {
  // verificamos si hay una url
  const { url } = req.params;
  // comparamos y encontramos un enlace que este relacionado con el parametro url
  const enlace = await Enlaces.findOne({ url });
  // si no hay enlace, que pase al siguiente controlador o middleware
  if (!enlace) {
    res.status(404).json({ msg: "El enlace no existe" });
    return next();
  }

  // en cambio si hay, usamos enlace y comprobamos si existe enlace.password!

  // TODO: retorna el password como true, y la url en la respuesta, sino pasa al sig controlador que es obtenerEnlace
  if (enlace.password) {
    return res.json({ password: true, enlace: enlace.url });
  }

  // TODO: el proximo controlador que se ira es "obtenerEnlace" que es el que retorna el archivo a descargar!
  next();
};

// Verifica si el password es correcto
exports.verificarTienePassword = async (req, res, next) => {
  // extraemos el parametro /:url
  const { url } = req.params;
  // extraemos password del body
  const { password } = req.body;

  // consultar por el enlace
  const enlace = await Enlaces.findOne({ url });

  // TODO: verificar el password

  // se compara el password ingresado en body con el password del enlace creado!
  if (bcrypt.compareSync(password, enlace.password)) {
    // Permitirle al usuario descargar el archivo
    next(); // TODO: el proximo controlador que se ira es "obtenerEnlace" que es el que retorna el archivo a descargar!
  } else {
    return res.status(401).json({ msg: "Password incorrecto" });
  }
};

// Obtener el enlace
exports.obtenerEnlace = async (req, res, next) => {
  const { url } = req.params;
  // verificar si existe el enlace
  //console.log(url);
  const enlace = await Enlaces.findOne({ url });
  if (!enlace) {
    res.status(404).json({ msg: "El enlace no existe" });
    return next();
  }

  // Si existe, retornar el nombre del archivo que es enlace.nombre
  res.json({ archivo: enlace.nombre, password: false });
  // TODO: ponemos password false por cuestiones de interfaz, para manejar interfaces con el frontend
  // ya que si no se deja en false, si el usuario pasa la validacion, seguiria mostrando el pedir password y no pasaria
  // hacia la otra interfaz.

  // que se vaya al siguiente controlador, obviamente si hay en algun caso alguno, TODO: si no hace nada.
  next();
};

// obtiene un listado de todos los enlaces

exports.listadoEnlaces = async (req, res) => {
  try {
    // TODO: para traernos todos usamos el find({}) con un objeto vacio para que no haya filtro
    // select para que traiga solo las url
    const enlaces = await Enlaces.find({}).select("url -_id"); // -_id para quitar el id de la consulta
    res.json({ enlaces });
  } catch (error) {
    console.log(error);
  }
};
