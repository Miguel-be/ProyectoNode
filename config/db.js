//Establecemos la conexión a nuestro servidor de BD usando la extensión mongoose

//Requerimos mongoose
const mongoose = require('mongoose');

//usamos la cadena asociada Atlas de mi usuario miguelizquierdohorche@gmail.com
const DB_URL="mongodb+srv://root:J7nl4ypFRSE0GqYc@cluster0.rvf2vmw.mongodb.net/?retryWrites=true&w=majority"

//Realizamos la conexión y controlamos errores
mongoose
  .connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to database!');
  })
  .catch(() => {
    console.error('Could not connect to the database!');
  });