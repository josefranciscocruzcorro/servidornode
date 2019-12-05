import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';
import mongoose from 'mongoose';
import session from 'express-session';
import helmet from 'helmet';

import configuracion from './configuracion';

const app = express();

//ONEXION A DB Mongo
const uridb = configuracion.mongodb;

const optionsdb = {
    useNewUrlParser: true, useCreateIndex: true,  useUnifiedTopology: true
};

mongoose.connect(uridb,optionsdb).then(()=>{
    console.log('Conectado a la base de datos  Mongo');
},err => {
    console.log(err);
});

//MIDDLEWARES
app.use(morgan('tiny'));//ACCIONES DEL SERVIDOR
app.use(cors());//ACEPTA PETICIONES DE OTTROS LADOS
app.use(express.json());//ENVIA RESUESTAS JSON
app.use(express.urlencoded({extended: true}));//ACEPTA FORMULARIOS WWW X ENCODED

app.use(session({
    secret: configuracion.sesionSecret,
    resave: true,
    saveUninitialized: true
}));
app.use(helmet());

//RUTAS
/* app.get('/',function (req,res) {
    res.send('Hola Mundo');
});*/
app.use('/api',require('./routes/usuario'));

//MIDDLEWARE VUEJS
const history = require('connect-history-api-fallback');
app.use(history());
app.use(express.static(path.join(__dirname, 'public')));

//SETEO DE PUERTO
app.set('puerto',process.env.PORT || 3000);

//CORRER SERVIDOR
app.listen(app.get('puerto'),function () {
    console.log('Servidor corriendo puerto ' + app.get('puerto'));
});