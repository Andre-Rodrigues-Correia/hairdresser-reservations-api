const {Router} = require('express')
const Usuarios = require('../models/Usuarios')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const routes = Router()




//private routes
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMDQzMzExNmUyMzBjMjE4M2Q4NmY3OSIsImlhdCI6MTY2MTIyMjUxNn0.buNtub3LOGAhc2EkiO4nVAqlXnV5kjhSPJX1faXG4SY
routes.get('/:id', checkToken, async(req, res)=>{

    const idUsuario = req.params.id;
    const usuario = await Usuarios.findById(idUsuario, '-passowrd')

    if(!usuario){
        res.status(500).json({message: 'usuario não encontrado'})
        return
    }

    res.status(200).json({message: 'logado com sucesso'});
})

function checkToken(req, res, next){
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(" ")[1]

    if(!token){
        res.status(401).json({message: 'acesso negado'})
        return
    }

    try {
        const secret = process.env.SECRET
        jwt.verify(token, secret)

        next()

    } catch (error) {
        res.status(400).json({message: 'token inválido'})
        return
    }
}

//public routes
routes.post('/cadastrar', async (req, res)=>{
    
    const {name, email, password, confirmPassword} = req.body;

    if(!name){
        res.status(500).json({message: 'por favor, preencha seu nome'})
        return
    }
    if(!email){
        res.status(500).json({message: 'por favor, preencha seu e-mail'})
        return
    }
    if(!password){
        res.status(500).json({message: 'por favor, preencha sua senha'})
        return
    }
    if(!confirmPassword){
        res.status(500).json({message: 'as senhas não são iguais'})
        return
    }

    if(password !== confirmPassword){
        res.status(500).json({message: 'As senhas não conferem'})
        return
    }

    const userExistis = await Usuarios.findOne({email: email});

    if(userExistis){
        res.status(500).json({message: 'Usuario já cadastrado'})
        return
    }

    const salt = await bcrypt.genSalt(12)
    const passwordHash =  await bcrypt.hash(password, salt)

    const usuario = new Usuarios ({
        name,
        email,
        password: passwordHash
    })

    try {
        //const cadastrar = await Usuarios.
        await usuario.save()
        res.status(200).json({message: 'cadastrado com sucesso'});
    } catch (error) {
        res.status(500).json({message: 'error'})
    }

})

routes.post('/login', async(req, res)=>{

    const {email, password} = req.body;

    if(!email){
        res.status(500).json({message: 'por favor, digite seu e-mail'})
        return
    }

    if(!password){
        res.status(500).json({message: 'por favor, digite sua senha'})
        return
    }

    const usuario = await Usuarios.findOne({email: email})

    if(!usuario){
        res.status(500).json({message: 'usuario não encontrado'})
        return
    }

    const checkPassword = await bcrypt.compare(password, usuario.password)

    if(!checkPassword){
        res.status(500).json({message: 'senha inválida'})
        return
    }

    try {

        const secret = process.env.SECRET

        const token = jwt.sign({
            id: usuario._id,
        },
        secret,
        )

        res.status(200).json({message: 'Autenticação realizada com sucesso', token})
        
    } catch (error) {
        res.status(500).json({message: 'error'})
    }
    //res.status(200).json({message: 'ok'})

})

routes.put('/atualizar/:id', async (req, res)=>{
    const id = req.params.id;
    const {name, email, password, confirmPassword} = req.body;

    const user = Usuarios.findById(id)

    if(!user){
        res.status(500).json({message: 'usuario não encontrado'})
        return
    }

    if(!name){
        res.status(500).json({message: 'por favor, preencha o nome'})
        return
    }

    if(!email){
        res.status(500).json({message: 'por favor, preencha o e-mail'})
        return
    }

    if(!password){
        res.status(500).json({message: 'por favor, preencha a senha'})
        return
    }

    if(!confirmPassword){
        res.status(500).json({message: 'por favor, preencha a confirmação da senha'})
        return
    }

    if(password !== confirmPassword){
        res.status(500).json({message: 'as senhas não são iguais'})
        return
    }

    const salt = await bcrypt.genSalt(12)
    const passwordHash =  await bcrypt.hash(password, salt)

    const usuario = new Usuarios({
        name,
        email,
        password: passwordHash
    })

    try {
        const updateUsuario = await Usuarios.updateOne({_id: user._id}, usuario);
        res.status(200).json({message: 'usuario cadastrado com sucesso'})
    } catch (error) {
        res.status(500).json({message: 'error'})
    }
})

routes.delete('/deletar/:id', async(req, res)=>{

    const id = req.params.id;
    const usuario = await Usuarios.findOne({_id: id})

    if(!usuario){
        res.status(500).json({message: 'usuario não encontrado'})
        return
    }

    
    try {
        const delete_reserva = await Usuarios.deleteOne({_id: id})
        res.status(200).json({message: 'usuario deletado com sucesso'})
    } catch (error) {
        res.status(500).json({message: 'error'})
    }
})



module.exports = routes