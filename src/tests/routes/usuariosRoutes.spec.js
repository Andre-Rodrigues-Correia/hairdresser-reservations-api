const request = require('supertest');
const app = require('../../../server');

const { connectDB, disconnectDB } = require('../../../database/connection');
const Usuarios = require('../../models/Usuarios');


   
describe('test routes usuarios', ()=>{

    let _id_valido = null;

    beforeAll(async ()=>{
        const test = await request(app).post('/usuarios/cadastrar').send({
            name: 'usuario test',
            email:'usuario_test@emial.com',
            password:'1234',
            confirmPassword:'1234',
        })

        const user = await Usuarios.findOne({email: "usuario_test@emial.com"});

        _id_valido = user._id
        // const res2 = await request(app).get(`/usuarios/${_id_valido}`)

        // _id_valido = res2.body[0]._id;

    });
  
    afterAll(() => {
      disconnectDB();
    });

    it('test response route /cadastrar', async ()=>{

        const res = await request(app).post('/usuarios/cadastrar').send({
            name: 'usuario 1',
            email:'usuario1@emial.com',
            password:'1234',
            confirmPassword:'1234',
        })

        const resNotName = await request(app).post('/usuarios/cadastrar').send({
            email:'usuario1@emial.com',
            password:'1234',
            confirmPassword:'1234',
        })

        const resNotEmail = await request(app).post('/usuarios/cadastrar').send({
            name: 'usuario 1',
            password:'1234',
            confirmPassword:'1234',
        })

        const resNotPass = await request(app).post('/usuarios/cadastrar').send({
            name: 'usuario 1',
            email:'usuario1@emial.com',
            confirmPassword:'1234',
        })

        const resNotConfirmPass = await request(app).post('/usuarios/cadastrar').send({
            name: 'usuario 1',
            email:'usuario1@emial.com',
            password:'1234',
        })

        const resIncorrectPass = await request(app).post('/usuarios/cadastrar').send({
            name: 'usuario 1',
            email:'usuario1@emial.com',
            password:'1234',
            confirmPassword:'12345',
        })


        expect(res.status).toEqual(200)
        expect(resNotName.status).toEqual(500)
        expect(resNotEmail.status).toEqual(500)
        expect(resNotPass.status).toEqual(500)
        expect(resNotConfirmPass.status).toEqual(500)
        expect(resIncorrectPass.status).toEqual(500)
        //expect(userExistis.status).toEqual(500)     
    })

    it('test login routes', async()=>{
        const res = await request(app).post('/usuarios/login').send({
            email: 'usuario1@emial.com',
            password: '1234'
        })

        const resincorrectEmail = await request(app).post('/usuarios/login').send({
            email: 'u@emial.com',
            password: '1234'
        })
        const resincorrecPassword = await request(app).post('/usuarios/login').send({
            email: 'usuario1@emial.com',
            password: '1'
        })

        const resNotEmail = await request(app).post('/usuarios/login').send({
            password: '1234'
        })

        const resNotPassword = await request(app).post('/usuarios/login').send({
            email: 'usuario1@emial.com',
        })

        expect(res.status).toEqual(200)
        expect(resincorrectEmail.status).toEqual(500)
        expect(resincorrecPassword.status).toEqual(500)
        expect(resNotEmail.status).toEqual(500)
        expect(resNotPassword.status).toEqual(500)
    })

    it('test route atualizar', async()=>{
        const res_completa = await request(app).put(`/usuarios/atualizar/${_id_valido}`).send({
            name: 'usuario 1',
            email:'usuario1@emial.com',
            password:'1234',
            confirmPassword:'1234',
        })

        const res_not_name = await request(app).put(`/usuarios/atualizar/${_id_valido}`).send({
            email:'usuario1@emial.com',
            password:'1234',
            confirmPassword:'1234',
        })

        const res_not_email = await request(app).put(`/usuarios/atualizar/${_id_valido}`).send({
            name: 'usuario 1',
            password:'1234',
            confirmPassword:'1234',
        })

        const res_not_pass = await request(app).put(`/usuarios/atualizar/${_id_valido}`).send({
            name: 'usuario 1',
            email:'usuario1@emial.com',
            confirmPassword:'1234',
        })

        const res_not_confirm_pass = await request(app).put(`/usuarios/atualizar/${_id_valido}`).send({
            name: 'usuario 1',
            email:'usuario1@emial.com',
            password:'1234',
        })

        const res_diferenct_pass = await request(app).put(`/usuarios/atualizar/${_id_valido}`).send({
            name: 'usuario 1',
            email:'usuario1@emial.com',
            password:'1234',
            confirmPassword:'12345',
        })

        const res_not_user = await request(app).put(`/usuarios/atualizar/1234`).send({
            name: 'usuario 1',
            email:'usuario1@emial.com',
            password:'1234',
            confirmPassword:'12345',
        })
     
        expect(res_completa.status).toEqual(200)
        expect(res_not_name.status).toEqual(500)
        expect(res_not_email.status).toEqual(500)
        expect(res_not_pass.status).toEqual(500)
        expect(res_not_confirm_pass.status).toEqual(500)
        expect(res_diferenct_pass.status).toEqual(500)
        expect(res_not_user.status).toEqual(500)
    })

    it('test route deletar', async()=>{
        const id_invalido = 1234

        const res = await request(app).delete(`/usuarios/deletar/${_id_valido}`)
        const res_not_valid = await request(app).delete(`/usuarios/deletar/`)

        expect(res.status).toEqual(200)
        expect(res_not_valid.status).toEqual(404)
    })
})