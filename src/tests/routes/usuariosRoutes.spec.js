const request = require('supertest');
const app = require('../../../server')
const { connectDB, disconnectDB } = require('../../../database/connection');


   
describe('test routes usuarios', ()=>{

    let _id_valido = null;

    beforeAll(async ()=>{

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
})