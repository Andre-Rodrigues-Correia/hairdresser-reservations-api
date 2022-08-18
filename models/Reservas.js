
const mongoose = require("mongoose")


const Reserva = mongoose.model('Reservas', {
    barbeiro: String,
    data: Date,
});

module.exports = Reserva;