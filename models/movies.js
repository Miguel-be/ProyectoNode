//Establecemos el esquema de movies
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const moviesSchema = new Schema({
    title: {type:String, required:true},
    director: {type:String, required:true},
    year: {type:Number, required:true},
    genre: {type:String,
           enum: {
                   values: ["acción", "animación", "comedia romántica", "ciencia ficción"],
                   message: "Ese género no está dado de alta"
                 }
            },
    cover: {type:String}
    },
    {        
        typestamp:true,
    }
);
const Movies = mongoose.model('Movies', moviesSchema);

//Exportamos la colección Movies
module.exports = Movies;