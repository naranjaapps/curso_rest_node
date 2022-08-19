const {Schema, model } = require('mongoose');

const UserSchema = Schema({
    nombre :{
        type : String,
        required : [true, 'el nombre es obligatorio]'],
    },
    correo :{
        type : String,
        required : [true, 'el correo es obligatorio]'],
        unique: true,
    },
    contrasena :{
        type : String,
        required : [true, 'la contrasena es obligatoria]'],
    },
    imagen :{
        type : String,
    },
    rol :{
        type : String,
        required : [true, 'el rol es obligatoria]'],
        enum: ['ADMIN_ROL', 'USER_ROL']
    },
    estado :{
        type : Boolean,
        default : true,
    },
    google :{
        type : Boolean,
        default : false,
    },

});



module.exports = model('Usuario', UserSchema);