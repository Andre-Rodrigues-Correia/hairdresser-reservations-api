const request = require('supertest');
const app = require('../../../server')

const { connectDB, disconnectDB } = require('../../../database/connection');

describe('test router insert reserva', ()=>{

    
      afterAll(() => {
        disconnectDB();
      });
    it('should return code 201', async()=>{

        const barbeiro = "Barbeiro 1";
        const data = new Date("1995-12-17T03:24:00");


        const reserva = {
            barbeiro,
            data
        }

        const res = await request(app).post('/reservas/inserir').send(reserva)
        expect(res.status).toEqual(201);
    })

})