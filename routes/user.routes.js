//Establecemos los end points de Users: get, register, login, login-jwt y logout.
const express= require("express");
const passport=require("passport");
const Users=require("../models/users.js");
const bcrypt = require("bcrypt");
const createError = require('../utils/errors/create-error');
const getJwt = require("../utils/authentication/jsonwebtoken.js");
const router= express.Router();

//Se recogen los elementos de la colección Users
router.get("/", async(req,res,next)=>
{    
    try {
            const resul= await Users.find();
            res.status(200).json(resul);
        }      
     catch (err) {
        return next(err);
    }
})

//Se añade con Passport un nuevo usuario
router.post('/register', (req, res, next) => { 
    const done = (err, user) => {        
        if (err) {
            return next(err);
        }        
        req.logIn(
            user,
            (err) => {
                if (err) {
                    return next(err);
                }
                return res.status(201).json(user);
            }
        );
    };
    
    passport.authenticate('register', done)(req);
});

//Se hace login con Passport de un usuario
router.post('/login', (req, res, next) => {
    const done = (err, user) => {
        if (err) {
            return next(err);
        }     
        req.logIn(
            user,
            (err) => {
                if (err) {
                    return next(err);
                }
                return res.status(200).json(user);
            }
        );
    };
    passport.authenticate('login', done)(req);
});

//Se hace login con JWT de un usuario
router.post('/login-jwt', async (req, res, next) => {
    const { email, password } = req.body;

    const user = await Users.findOne({ email });
    if (!user) {
        return next(createError('El usuario no existe'), 404);
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
        return next(createError('La contraseña no es válida', 403));
    }

    user.password = null;
    const token = getJwt(user, req.app.get('secretKey'));
    return res.status(200).json({
        user,
        token
    });
});

//Se hace logout de un usuario con Passport
router.post('/logout', (req, res, next) => {
    if (req.user){
        req.logOut(()=>{
            req.session.destroy(()=>{
                res.clearCookie("connect.sid");
                return res.status(200).json("Hasta luego");
            })
        });        
    }
    else{
        return res.status(304).json("Usuario no logueado");
    }
});

//Se expprta el router
module.exports=router;