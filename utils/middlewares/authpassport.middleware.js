//Se define el middleware de acceso con passport. La función isAuthenticated nos da si el 
//usuario tiene acceso
const createError= require("../errors/create-error.js")
const isAuthPassport= (req,res,next)=>{   
    if (req.isAuthenticated())
    {      
        return next();       
    }
    else{
        return next(createError("No tienes acceso", 401));
    }
}

//Se exporta la función.
module.exports=isAuthPassport;