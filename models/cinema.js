//Establecemos el esquema de cinema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cinemaSchema = new Schema({
    name: {type:String, required:true},
    location: {type:String, required:true},    
    movies: [{type:mongoose.Types.ObjectId, required: true, ref:"Movies"}] 
    },
    {        
        typestamp:true,
    }
);
const Cinemas = mongoose.model('Cinemas', cinemaSchema);

//Exportamos la colección Cinemas
module.exports = Cinemas;