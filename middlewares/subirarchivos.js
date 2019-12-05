import path from 'path';
import multer from 'multer';
import md5 from 'md5';

import configuracion from '../configuracion';

//Definicion de multer para archivos
const multerStrg = multer.diskStorage({
    destination: path.join(__dirname,'../public/' + configuracion.storage),
    filename: (req,file,cb)=>{
        let nombreArc = md5(Date + '') + Math.random() + file.originalname;
        cb(null,nombreArc)
    }
});
const multerOp = multer({
    storage: multerStrg,
    dest: path.join(__dirname,'../public/' + configuracion.storage)
});



module.exports = multerOp;