//Establecemos los end points de Cinema: get, put, delete y post.
const express = require('express');
const Cinemas=require("../models/cinema.js");
const isAuthPassport=require("../utils/middlewares/authpassport.middleware.js");
const createError = require('../utils/errors/create-error');
const router = express.Router();

//Definición del end point para recibir todos los elementos de la colección Cinema
router.get("/", async(req,res,next)=>
{
    try {             
            const resul= await Cinemas.find().populate("movies");           
            res.status(200).json(resul);   
        }      
     catch (err) {
        return next(err);
    }
})

//Definición del end point para añadir un nuevo elemento de la colección Cinema
//Tiene el middleware que permite acceso sólo a usuarios registrados
router.post("/", [isAuthPassport], async(req,res,next)=>
{    
    try {   const cinemaNew= new Cinemas({...req.body});   
            const createdCinema= await cinemaNew.save();
            res.status(201).json(createdCinema);
    } catch (err) {
        return next (err);
    }
})

//Definición del end point para añadir un nuevo elemento de la colección Cinema para integración React
//Tiene el middleware que permite acceso sólo a usuarios registrados
router.post("/free", [], async(req,res,next)=>
{    
    try {   const cinemaNew= new Cinemas({...req.body});   
            const createdCinema= await cinemaNew.save();
            res.status(201).json(createdCinema);
    } catch (err) {
        return next (err);
    }
})

//Definición del end point para modificar un elemento de la colección Cinema
//Tiene el middleware que permite editar sólo a usuarios registrados
router.put("/edit/:id", [isAuthPassport], async(req,res,next)=>
{
    try {
            const {id}= req.params;
            const cinemaChanges= new Cinemas({...req.body}); 
            cinemaChanges._id=id;  
            const cinemaToEdit= await Cinemas.findByIdAndUpdate(id,
                {$set:{...cinemaChanges}},
                {new:true}
            );
            res.status(201).json(cinemaToEdit);           
    } catch (err) {
        return next (err);
    }
})

//Se duplica definición del end point para modificar un elemento de la colección Cinema
//ejercicio de React no auth
router.put("/edit-free/:id", [], async(req,res,next)=>
{
    try {
            const {id}= req.params;
            const cinemaChanges= new Cinemas({...req.body}); 
            cinemaChanges._id=id;  
            const cinemaToEdit= await Cinemas.findByIdAndUpdate(id,
                {$set:{...cinemaChanges}},
                {new:true}
            );
            res.status(201).json(cinemaToEdit);           
    } catch (err) {
        return next (err);
    }
})

//Definición del end point para eliminar un elemento de la colección Cinema
//Tiene el middleware que permite borrar sólo a usuarios registrados y dentro del end point
//además comprobamos que tengan el rol admin
router.delete("/delete/:id", [isAuthPassport], async(req,res,next)=>
{
    try {       
          if (req.user.rol==="admin"){
            const {id}= req.params;            
            await Cinemas.remove({"_id": id}); 
            res.status(201).json("Elemento eliminado correctamente");
            }
          else {
             next (createError('No tienes acceso admin', 403));
               }
    } catch (err) {        
        return next (err);
    }
})

//Se duplica definición del end point para eliminar un elemento de la colección Cinema
//ejercicio React
router.delete("/delete-free/:id", [], async(req,res,next)=>
{
    try {       
            const {id}= req.params;            
            await Cinemas.remove({"_id": id}); 
            res.status(201).json("Elemento eliminado correctamente");
            }

    } catch (err) {        
        return next (err);
    }
})

//Exportamos el router para luego usarlo en el index
module.exports = router;
