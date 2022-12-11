//Se establece la función de autentificación con JWT. Con Sign se crea y firma
//nuevo token incluyendo los datos del cuerpo, clave secreta y tiempo de expiración.
const jwt= require("jsonwebtoken");
const getJwt= (userInfo, secretKey)=>{
        return jwt.sign(
            {
                id: userInfo._id,
                email: userInfo.email
            },
            secretKey,
            {
                expiresIn:12000
            }
        );
};
//Se exporta la función
module.exports=getJwt;

