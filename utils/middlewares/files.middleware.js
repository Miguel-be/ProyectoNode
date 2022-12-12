//Middleware para subir archivos
const multer = require("multer");
const path = require("path");
const createError = require("../errors/create-error.js");

//Se definen los archivos válidos
const VALID_FILE_TYPES = ['image/png', 'image/jpg', 'image/jpeg'];

const fileFilter = (req, file, cb) => {
    if (!VALID_FILE_TYPES.includes(file.mimetype)) {
        cb(createError("El tipo de archivo no es aceptado"));
    } else {
        cb(null, true);
    }
};

//se establece nombre y destino de los archivos
const storage = multer.diskStorage({
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname);
    },
    destination: (req, file, cb) => {
        cb(null, "/tmp/");
    }
});

const upload = multer({
    storage,
    fileFilter
});

//se exporta la función upload
module.exports = upload;