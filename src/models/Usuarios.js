
const mongoose = require("mongoose")


const Usuarios = mongoose.model('Usuarios', {
    name: String,
    email: String,
    password: String,
});

module.exports = Usuarios;