//Requerimos dotenv para gestionar las variables de entorno
require("dotenv").config();

//Requerimos la extensión Express para poder usarla posteriormente
const express = require('express');
//Creamos la conexión a la base de datos
require('./config/db');
//Conexión DB asociada Atlas miguelizquierdohorche@gmail.com. Está en variable de entorno o por defe
const DB_URL= process.env.DB_URL;

//Requerimos la extensión Cors para poder usarla posteriormente
//1.- Comentado proyecto react
const cors = require('cors');
//Gestión de errores
const createError = require('./utils/errors/create-error.js');
//Requerimos passport
const passport = require("passport");

//Requerimos los archivos con la definición de los endpoints para movies y cinema
const moviesRoutes = require('./routes/movies.routes');
const cinemasRoutes = require('./routes/cinema.routes');
const userRoutes=require("./routes/user.routes.js");
const session=require("express-session");
const MongoStore=require("connect-mongo");
const { Mongoose } = require('mongoose');
//Hacemos uso de express
const server = express();
//Requerimos path para identificar nuestra ruta
const path=require("path");

//Hacemos uso de cors para poder trabajar en local
//Lo comentamos para integración React server.use(cors());
//*1- Añadido para integración React
const corsOptions ={
    origin:true,
    credentials:true,            //access-control-allow-credentials:true
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    optionSuccessStatus:200
}
server.use(cors(corsOptions));
//*1- Hasta aquí añadido integración React
//Permitimos poder recoger información con json y encoded
server.use(express.json());
server.use(express.urlencoded({extended:false}));

//Ejecutamos el archivo de Passport e inicializamos Passport
require("./utils/authentication/passport.js");

//Creamos gestión de sesiones
//incluyo para la parte de react <---
server.use(session({
  secret: process.env.SESSION_SECRET_KEY,
  resave:false,
  saveUninitialized:false,
  cookie:{
    maxAge:600000,  
    httpOnly: true,   
    sameSite: 'lax'  
  },
  store: MongoStore.create({
    mongoUrl:DB_URL})
}));

// Usamos express.static para crear la ruta "public" en la que se servirán nuestros archivos estáticos
server.use(express.static(path.join(__dirname, 'public')));

//Inicializamos Passport
server.use(passport.initialize());
server.use(passport.session());

//Gestión error de ruta vacia
server.get("/",(req, res)=>{
  res.json("Bienvenido a mi API de cines y películas");
});


//Hacemos uso de los archivos con los endpoints
server.use("/user", userRoutes);
server.use('/movies', moviesRoutes);
server.use('/cinemas', cinemasRoutes);

//Recogemos la posibilidad de que el usuario haga uso de una ruta distinta a las definidas
server.use('*', (req, res, next) => {
  next(createError('Esta ruta no existe', 404));
});

//Gestionamos errores de manera sencilla
server.use((err, req, res, next) => {
  return res.status(err.status || 500).json(err.message || 'Unexpected error');
});

//Establecemos el puerto de conexión (cogemos variable de entorno o por defecto 3000) y 
//escuchamos en el mismo
const PORT = process.env.PORT | 3000;
server.listen(PORT, () => {
  console.log(`Server running in http://localhost:${PORT}`);
});

//necesario para el despliegue
module.exports=server;
