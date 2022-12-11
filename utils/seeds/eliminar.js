  //función que borra los usuarios de la aplicación.
  const mongoose = require('mongoose');
  const User= require("../../models/users");
  const DB_URL = "mongodb+srv://root:D4WGIRr83c33XaZc@cluster0.g58voxl.mongodb.net/?retryWrites=true&w=majority";
  
  mongoose.connect(DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
  }).then(async () => {        
    await User.collection.drop();     
    console.log("Borrada"); 
  }).catch(err => {
      console.log(`Ha habido un error eliminando los datos: ${err}`);
  })

  // mongoose.disconnect --> desconecta la conexión actual a la base de datos.
  .finally(() => mongoose.disconnect());



