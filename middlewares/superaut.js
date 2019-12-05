import express from 'express';

const router = express.Router();

import Usuario from '../models/usuario';

import configuracion from '../configuracion';

router.use(async(req,res,next) => {

    try {
        
        const usuarioDB =  await Usuario.findOne({_id: '' + req.session.tokenUserId,activo:true,email: '' + configuracion.superusuario});

        if (usuarioDB) {
            next();            
        } else {
            res.status(300).json({
                msg: 'Usuario no encontrado o no autorizado' 
            });
        }

    } catch (e) {

        return res.status(400).json({
            msg: 'A ocurrido un error',
            error: e
        });

    }

    next();
});

module.exports = router;