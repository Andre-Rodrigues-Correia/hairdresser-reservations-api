
const mongoose = require("mongoose")


const Reserva = mongoose.model('Reservas', {
    barbeiro: String,
    data: String,
});

module.exports = Reserva;