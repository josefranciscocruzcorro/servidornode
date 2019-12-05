import mongoose from 'mongoose';

const schema = mongoose.Schema;

const usuarioSchema = new schema({
    nombre: {type:String,required: [true,'El nombre es Obligatorio']},
    email: {type:String,required: [true,'El nombre es Obligatorio'],unique: [true,'Ya hay una cuenta con ese correo']},
    password: String,
    
    activo: {type: Boolean, default: true},
});

//creamos el modelo
const Usuario = mongoose.model('Usuario',usuarioSchema);

export default Usuario;