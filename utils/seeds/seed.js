//Semilla con datos iniciales de movies.
const moviesData = [
    {
      title: 'The Matrix',
      director: 'Hermanas Wachowski',
      year: 1999,
      genre: 'Acción',
    },
    {
      title: 'The Matrix Reloaded',
      director: 'Hermanas Wachowski',
      year: 2003,
      genre: 'Acción',
    },
    {
      title: 'Buscando a Nemo',
      director: 'Andrew Stanton',
      year: 2003,
      genre: 'Animación',
    },
    {
      title: 'Buscando a Dory',
      director: 'Andrew Stanton',
      year: 2016,
      genre: 'Animación',
    },
    {
      title: 'Interestelar',
      director: 'Christopher Nolan',
      year: 2014,
      genre: 'Ciencia ficción',
    },
    {
      title: '50 primeras citas',
      director: 'Peter Segal',
      year: 2004,
      genre: 'Comedia romántica',
    },
  ]; 

    moviesData.forEach(element => {
    element.title=element.title.toLowerCase();
    element.director=element.director.toLowerCase();
    element.genre=element.genre.toLowerCase();    
  });

  const mongoose = require('mongoose');
  const Movies= require("../../models/movies.js");
 //const DB_URL = "mongodb+srv://root:D4WGIRr83c33XaZc@cluster0.g58voxl.mongodb.net/?retryWrites=true&w=majority";
//asociada Atlas miguelizquierdohorche@hotmail.com
 
const DB_URL="mongodb+srv://root:J7nl4ypFRSE0GqYc@cluster0.rvf2vmw.mongodb.net/?retryWrites=true&w=majority"
//asociada Atlas miguelizquierdohorche@gmail.com
  
  mongoose.connect(DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
  }).then(async () => {  
      const allMovies = await Movies.find();
      if (allMovies.length) {
          await Movies.collection.drop();
      }
  }).catch(err => {
      console.log(`Ha habido un error eliminando los datos: ${err}`);
  })
  .then(async () => {
      const newMovies = moviesData.map((e) => {
          return new Movies(e);
      });
      await Movies.insertMany(newMovies);
  })
  .catch((err) => {
      console.log(`Ha habido un error añadiendo los elementos a la base de datos: ${err}`);
  })
  // mongoose.disconnect --> desconecta la conexión actual a la base de datos.
  .finally(() => mongoose.disconnect());



