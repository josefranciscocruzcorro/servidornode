import express from 'express';

const router = express.Router();

import Usuario from '../models/usuario';

router.use(async(req,res,next) => {

    try {
        
        const usuarioDB =  await Usuario.findOne({_id: '' + req.session.tokenUserId,activo:true});

        if (usuarioDB) {
            next();            
        } else {
            res.status(300).json({
                msg: 'Usuario no encontrado' 
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