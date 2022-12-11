//Se establece la autentificación con Passport
const passport= require("passport");
const User=require("../../models/users.js");
const bcrypt=require("bcrypt");
const localstrategy=require("passport-local").Strategy;
const createError=require("../errors/create-error");

//Se establece la estrategia "register" en el que se incluye el rol
passport.use("register", 
new localstrategy(
    {
      usernameField:"email",
      passwordField:"password",
      passReqToCallback:true
    }, 
    async (req, email, password,done)=>{
     try {            
            const previousUser= await User.findOne({email});
            if (previousUser)
            {
              return done(createError("Este usuario ya existe. Inicia sesión"));
            }            
            const encPassword= await bcrypt.hash(password, 10);
            const newUser= new User({
                email,
                password:encPassword,
                rol:req.body.rol
            });
            const saveduser= await newUser.save()
            return done(null, saveduser);       
     } catch (error) {
        return done(error);      
     }    
  }));

//Se establece la estrategia "login" en el que se incluye el rol
passport.use("login", 
new localstrategy(
    {
      usernameField:"email",
      passwordField:"password",
      rolField:"rol",
      passReqToCallback:true
    }, 
    async (req, email, password,done)=>{
     try {
            const currentUser= await User.findOne({email});
            if (!currentUser)
            {
              return done(createError("No existe usuario con este email. Debes registrarte"));
            }
            const isValidPassword= await bcrypt.compare(password, currentUser.password);
            
            if (!isValidPassword)
            {
              return done(createError("La contraseña no es correcta"))
            }
            currentUser.password=null;
            return done(null, currentUser);       
     } catch (error) {
        return done(error);      
     }    
  }));

//Se serializa y deserializa el usuario 
passport.serializeUser((user, done) => {
  return done(null, user._id);
});

passport.deserializeUser(async (userId, done) => {
  try {
      const existingUser = await User.findById(userId);
      return done(null, existingUser);
  } catch (err) {
      return done(err);
  }
});