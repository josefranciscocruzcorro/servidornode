import express from 'express';
import md5 from 'md5';

const router = express.Router();

///Importamos modelo de Usuario
import Usuario from '../models/usuario';

//importando Middlewares
const autentificacion = require('../middlewares/autentificacion');

//ruta de registro
router.post('/registrarse',async(req,res)=>{
    const body = req.body;

    try {

        body.password = md5(body.password);
        const usuarioDB = await Usuario.create(body).select('nombre email');

        req.session.tokenUserId = usuarioDB._id;

        res.status(200).json(usuarioDB);
        
    } catch (e) {

        return res.status(500).json({
            msg: 'A ocurrido un error en el servidor',
            error: e
        });

    }
});

//ruta de perfil
router.get('/perfil',autentificacion,async(req,res)=>{
    
    try {
        
        const usuarioDB =  await Usuario.findOne({_id: '' + req.session.tokenUserId}).select('nombre email');

        res.status(200).json(usuarioDB);

    } catch (e) {

        return res.status(300).json({
            msg: 'Debes Iniciar Sesion',
            error: e
        });

    }
});

router.put('/perfil',autentificacion,async(req,res)=>{
    
    try {
        
        const usuarioDB =  await Usuario.findByIdAndUpdate('' + req.session.tokenUserId,req.body).select('nombre email avatar date artista');

        res.status(200).json(usuarioDB);

    } catch (e) {

        return res.status(400).json({
            msg: 'A ocurrido un error',
            error: e
        });

    }
});

//iniciar sesion
router.post('/login',async(req,res)=>{
    
    try {
        
        const usuarioDB =  await Usuario.findOne({email: '' + req.body.email,password: md5('' + req.body.password)});

        req.session.tokenUserId = usuarioDB._id;

        res.status(200).json({
            exito: 'Sesion Iniciada'
        });

    } catch (e) {

        return res.status(400).json({
            msg: 'Usuario no encontrado',
            error: e
        });

    }
});

//cerrar sesion
router.get('/logout',(req,res)=>{
    req.session.destroy();

    res.status(200).json({
        exito: 'Sesion cerrada'
    });
});

module.exports = router;