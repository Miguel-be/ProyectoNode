//Establecemos los end points de Movies: get, put, delete y post.
const express = require('express');
const Movies=require("../models/movies.js");
const isAuthJWT=require("../utils/middlewares/authjwt.middleware.js");
const upload=require("../utils/middlewares/files.middleware.js");
const imagetoUri=require("image-to-uri");
const fs=require("fs");
const router = express.Router();

//End point que recoge todas las películas
router.get("/", async(req,res,next)=>
{
    try {
            const resul= await Movies.find();
            res.status(200).json(resul);
        }      
     catch (err) {
        return next(err);
    }
})

//End point que recoge una película según su Id
router.get("/id/:id", async(req,res,next)=>
{
    try {
            const id= req.params.id;
            const resul= await Movies.findById(id);
            res.status(200).json(resul);
        }      
     catch (err) {
        return next(err);
    }
})

//End point que recoge una película según su title
router.get("/title/:id", async(req,res,next)=>
{
    try {
            //comparamos con minúsculas para que no key senstive. La información también la guardamos en BD en minúscula.
            const id= req.params.id.toLowerCase();                       
            const resul= await Movies.find({"title":id});
            res.status(200).json(resul);
        }      
     catch (err) {
        return next(err);
    }
})

//End point que recoge películas según su genre
router.get("/genre/:id", async(req,res,next)=>
{
    try {
            //comparamos con minúsculas para que no key senstive. La información también la guardamos en BD en minúscula.
            const id= req.params.id.toLowerCase;              
            const resul= await Movies.find({"genre":id});
            res.status(200).json(resul);
        }      
     catch (err) {
        return next(err);
    }
})

//End point que recoge películas estrenadas después del 2010
router.get("/estreno-2010", async(req,res,next)=>
{
    try {                        
            const resul= await Movies.find({ year: { $gte : 2010 } });
            res.status(200).json(resul);
        }      
     catch (err) {
        return next(err);
    }
})

//End point para añadir una nueva pelicula. Se incluyen dos middlewares: uno para
//verificar que el usuario está registrado + login y otro para incluir portada
router.post("/", [isAuthJWT, upload.single("cover")], async(req,res,next)=>
{
    try {         
            const cover=req.file?req.file.filename:null;
            const movieNew= new Movies({...req.body, cover}) ;     
            //Guardamos datos en minúscula en BD para luego poder comparar fácilmente con minúsculas y no ser key senstive
            movieNew.title=movieNew.title.toLowerCase();
            movieNew.director= movieNew.director.toLowerCase();
            movieNew.genre= movieNew.genre.toLowerCase();
            const createdMovie= await movieNew.save();
            res.status(201).json(createdMovie);
    } catch (err) {
        return next (err);
    }
})

//End point para añadir una nueva pelicula. Se incluyen dos middlewares: uno para
//verificar que el usuario está registrado + login y otro para incluir portada. En este 
// caso se suben las imagenes en base 64
router.post("/with-uri", [isAuthJWT, upload.single("cover")], async(req,res,next)=>
{
    try {                 
            const filepath= req.file?req.file.path:null;
            const cover= imagetoUri(filepath);
            const movieNew= new Movies({...req.body, cover}) ;     
            //Guardamos datos en minúscula en BD para luego poder comparar fácilmente con minúsculas y no ser key senstive
            movieNew.title=movieNew.title.toLowerCase();
            movieNew.director= movieNew.director.toLowerCase();
            movieNew.genre= movieNew.genre.toLowerCase();
            const createdMovie= await movieNew.save();
            await fs.unlinkSync(filepath);
            res.status(201).json(createdMovie);
    } catch (err) {
        return next (err);
    }
})

//End point creado para el proyecto de React. Sólo middleware para subir imagen. En este 
// caso se suben las imagenes en base 64
router.post("/with-uri-free", [isAuthJWT, upload.single("cover")], async(req,res,next)=>
{
    try {                 
            const filepath= req.file?req.file.path:null;
            const cover= imagetoUri(filepath);
            const movieNew= new Movies({...req.body, cover}) ;     
            //Guardamos datos en minúscula en BD para luego poder comparar fácilmente con minúsculas y no ser key senstive
            movieNew.title=movieNew.title.toLowerCase();
            movieNew.director= movieNew.director.toLowerCase();
            movieNew.genre= movieNew.genre.toLowerCase();
            const createdMovie= await movieNew.save();
            await fs.unlinkSync(filepath);
            res.status(201).json(createdMovie);
    } catch (err) {
        return next (err);
    }
})

//End point para editar una pelicula. Se incluye middleware para verificar que el usuario 
//está registrado + login 
router.put("/edit/:id", [isAuthJWT], async(req,res,next)=>
{
    try {
            const {id}= req.params;
            const movieChanges= new Movies({...req.body});
            //Guardamos datos en minúscula en BD para luego poder comparar fácilmente con minúsculas y no ser key sensitive
            if (movieChanges.title) {movieChanges.title=movieChanges.title.toLowerCase();}
            if (movieChanges.director){movieChanges.director=movieChanges.director.toLowerCase(); }
            if (movieChanges.genre){movieChanges.genre=movieChanges.genre.toLowerCase();}           

            movieChanges._id=id;                        
            const movieToEdit= await Movies.findByIdAndUpdate(id,
                {$set:{...movieChanges}},
                {new:true}
            );
            res.status(201).json(movieToEdit);    
    } catch (err) {
        return next (err);
    }
})

//End point para borrar una pelicula. Se incluye middleware para verificar que el usuario 
//está registrado + login 
router.delete("/delete/:id", [isAuthJWT], async(req,res,next)=>
{
    try {
            const {id}= req.params;            
            await Movies.remove({"_id": id}); 
            res.status(201).json("Elemento eliminado correctamente");
    } catch (err) {      
        return next (err);
    }
})

//Se exporta el router para usarlo en index.js
module.exports = router;
