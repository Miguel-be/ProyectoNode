//Middleware que gestiona el acceso con JWT
const jwt = require("jsonwebtoken");
const createError=require("../errors/create-error.js");

//Se establece la función de acceso: primero se comprueba que el usuario tiene la autorización
//en la cabecera. Si la tiene, se mira si tiene la estrcutura correcta y luego se verifica el token. En caso de que sea correcto, en el payload se recoge la información del usuario.
const isAuthJWT = (req, res, next)=> {
    const authorization= req.headers.authorization;
    if (!authorization){
        return next(createError("No estás autorizado", 401));
    }    

    const splitAuth = authorization.split(" ");
    if (splitAuth.length !== 2 || splitAuth[0] !== "Bearer") {
        return next(createError("Cabecera authorization incorrecta", 400));
    }

    const token=splitAuth[1];
    let payload;

    try {
        payload=jwt.verify(token, process.env.JWT_SECRET_KEY);        
    } catch (error) {
        return next(error);
    }

    req.authority= {
        id:payload.id,
        email:payload.email
    };

    next()       
}
//Se exporta la función
module.exports=isAuthJWT;