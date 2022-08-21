const {Router} = require('express')
const Reservas = require('../models/Reservas')

const routes = Router()

routes.post('/inserir', async (req, res) => {

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

routes.get('/buscar', async (req, res) =>{
    try {
        const reservas = await Reservas.find();
        res.status(200).json(reservas)
    } catch (error) {
        res.status(404).json({message: 'not a found'})
    }
})


routes.get(`/buscar/:id`, async (req, res) =>{
    const idReserva = req.params.id;
    try {
        const reserva = await Reservas.findOne({_id: idReserva});

        if(!reserva){
            res.status(404).json({message: 'reserva not a found'})
        }

        res.status(200).json(reserva)
    } catch (error) {
        res.status(404).json({message: 'not a found'})
    }
    
});

routes.put(`/atualizar/:id`, async (req, res) =>{

    const idReserva = req.params.id;
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
        data
    }

    try {
        const update_reserva = Reservas.updateOne({_id: idReserva}, reserva);
        res.status(200).json(reserva)
    } catch (error) {
        res.status(500).json({message: 'error'})
    }
});

routes.delete(`/deletar/:id`, async(req, res)=>{
    const idReserva = req.params.id;
    

    const reserva = await Reservas.findOne({_id: idReserva});

    if(!reserva){
        res.status(424).json({message: 'reserva not a found'});
        return
    }

    try {
        const delete_reserva = await Reservas.deleteOne({_id: idReserva});
        res.status(200).json({message: 'deleted'});
    } catch (error) {
        res.status(500).json('error');
    }
});

module.exports = routes