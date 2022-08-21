const request = require('supertest');
const app = require('../../../server')
const { connectDB, disconnectDB } = require('../../../database/connection');

describe('test routes', ()=>{

  let _id_valido = null;

      beforeAll(()=>{

      });
    
      afterAll(() => {
        disconnectDB();
      });
    it('should return code 201 in route insert', async()=>{

        const barbeiro = "Barbeiro 1";
        const data = new Date("1995-12-17T03:24:00");

        const reserva_completa = {
            barbeiro,
            data
        }

        const reserva_Sem_barbeiro = {
          data
        }

        const reserva_sem_data = {
         barbeiro,
        }



        const res_completa = await request(app).post('/reservas/inserir').send(reserva_completa)
        const res_sem_barbeiro = await request(app).post('/reservas/inserir').send(reserva_Sem_barbeiro)
        const res_sem_data = await request(app).post('/reservas/inserir').send(reserva_sem_data)
        expect(res_completa.status).toEqual(201);
        expect(res_sem_barbeiro.status).toEqual(422);
        expect(res_sem_data.status).toEqual(422);
    })

    it('shuld return 200 in route buscar reservas', async ()=>{
     
      const response = await request(app).get('/reservas/buscar');
      _id_valido = response.body[0]._id;
      expect(response.status).toEqual(200)
      expect(response.body.length).toBeGreaterThan(0)
    })

    it('should return 200 in route buscar reservas por id', async ()=>{

      const res = await request(app).get(`/reservas/buscar/${_id_valido}`);
      const res_id_invalido = await request(app).get(`/reservas/buscar/invalido`);
      expect(res.status).toEqual(200)
      expect(res_id_invalido.status).toEqual(404)
    })

    it('should return 200 in route atualizar', async ()=>{
      const id = _id_valido
      const barbeiro = "Barbeiro 1";
      const data = new Date("1995-12-17T03:24:00");

      const reserva_completa = {
          barbeiro,
          data
      }

      const reserva_sem_barbeiro = {
        data
      }

      const reserva_sem_data = {
       barbeiro,
      }


      const res_completa = await request(app).put(`/reservas/atualizar/${_id_valido}`).send(reserva_completa)
      const res_sem_barbeiro = await request(app).put(`/reservas/atualizar/${_id_valido}`).send(reserva_sem_barbeiro)
      const res_sem_data = await request(app).put(`/reservas/atualizar/${_id_valido}`).send(reserva_sem_data)
      const res_invalida = await request(app).put(`/reservas/`).send({})

      expect(res_completa.status).toEqual(200);
      expect(res_sem_barbeiro.status).toEqual(422)
      expect(res_sem_data.status).toEqual(422)
      expect(res_invalida.status).toEqual(404)

    })

    it('should return 200 in route deletar', async ()=>{
      const id = _id_valido;
      const id_fake = _id_valido + '2'
      const res = await request(app).delete(`/reservas/deletar/${_id_valido}`)
      const res_invalido = await request(app).delete(`/reservas/deletar/`)

      expect(res.status).toEqual(200)
      expect(res_invalido.status).toEqual(404)

    })

})