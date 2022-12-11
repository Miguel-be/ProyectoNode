//Establecemos el esquema de usuarios del sistema
const mongoose = require("mongoose");
const Schema= mongoose.Schema;

const userSchema = new Schema({    
    email: {
      type: String,
      required: true,
      unique: true,
      // Match: matchea los valores contra una regex
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'El email no tiene un formato válido']
     },
    password: {type:String, require:true} ,
    rol:{type:String}  
},
{timestamps:true});

const Users = mongoose.model('Users', userSchema);

//exportamos la colección de usuarios
module.exports = Users;
