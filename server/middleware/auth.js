// librerias
const jwt = require("jsonwebtoken");
// variables env
require("dotenv").config({ path: "variables.env" });

module.exports = (req, res, next) => {
  const authHeader = req.get("Authorization");

  if (authHeader) {
    // obtener jwt
    const token = authHeader.split(" ")[1];
    // comprobar jwt
    try {
      const usuario = jwt.verify(token, process.env.SECRETA);
      /*res.json({ usuario}); no enviamos como respuesta porque puede exponer!
         la idea es mandarlo de forma interna, por seguridad.
         lo asignamos o inyectamos internamente en la req, haciendolo parte de la peticion (req.usuario = usuario)
         */
      req.usuario = usuario;
    } catch (error) {
      console.log(error);
      res.status(401).json({ msg: "Jwt no valido" });
    }
  }

  return next();
};
