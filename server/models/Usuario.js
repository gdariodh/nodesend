// El modelo es que el que va a definir la forma en que va a recibir los datos, que se ingresaran a la DB
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usuariosSchema = new Schema({
    email:{
       type: String,
       required: true,
       unique: true,
       lowercase: true,
       trim: true
    },
    nombre:{
       type: String,
       required: true,
       trim: true
    },
    password:{
      type: String,
      required: true,
      trim: true
    }
});

module.exports = mongoose.model('Usuarios',usuariosSchema)