// Pasos para iniciar nuestro proyecto
const express = require("express");
// cors - necesario para poder hacer peticiones desde otro dominio o localhost
const cors = require("cors");
// crea el servidor
const app = express();
// Paso 4 - importamos nuestra conexion con la DB
const conectarDB = require("./config/db");

// Paso 5 - Conexion DB!
conectarDB();

// Ultimo paso - habilitar cors
// para que solo acepta peticiones de un solo dominio y limitar las peticiones
const opcionesCors = {
  origin: process.env.FRONTEND_URL,
};

app.use(cors(opcionesCors));

/* Paso 2 - El primero se asigna dependiendo de la produccion(Heroku) y el segundo es el local */
const port = process.env.PORT || 4000;

// paso 6 - agregar body parser para poder enviar y leer los datos que se envian en el body - ahora .json()
app.use(express.json());

// TODO: Paso que se vino hacer cuando habitalitamos las descargas de los archivos en el frontend

// Habitlitar carpeta publica de uploads donde se encuentran los archivos subidos
app.use(express.static("uploads"));

// TODO: Aca todo sigue como antes

// Rutas de la api o endpoints -> ej: http://localhost:4000/api/usuarios
app.use("/api/usuarios", require("./routes/usuarios"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/enlaces", require("./routes/enlaces"));
app.use("/api/archivos", require("./routes/archivos"));

// Paso 3 - correr el servidor -> Creamos la conexion en config/db
app.listen(port, "0.0.0.0", () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});
