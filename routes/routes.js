const router = require('express').Router()

const Reservas = require('../models/Reservas')

router.post('/reservas/inserir', async (req, res) => {

    const {barbeiro, data} = req.body

    if(!barbeiro){
        res.status(422).json({message: 'Por favor, escolha um barbeiro'});
        return;
    }
    if(!data){
        res.status(422).json({message: 'por favor, escolha uma data'});
        return;
    }

    const reserva = {
        barbeiro,
        data,
        horario
    }

    try {

        await Reservas.create(reserva);
        res.status(201).json({message: 'reserva inserted successfully'});

    } catch (error) {
        res.status(500).json({
            error: error
        })
    }

})


module.exports = router