// ORM, conecta la app con la base de datos
const mongoose = require("mongoose");
// Dotenv - Conecta las variables de entorno con la app -> path: es para indicarle donde estan nuestras variables
require("dotenv").config({
  path: "variables.env",
});

const conectarDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });

    console.log("DB Conectada");
  } catch (error) {
    console.log("Hubo un error! ", error);
    // detiene el servidor
    process.exit(1);
  }
};

module.exports = conectarDB;
