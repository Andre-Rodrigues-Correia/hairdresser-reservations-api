const request = require('supertest')
const app = require('../../server')
const { connectDB, disconnectDB } = require('../../database/connection');

describe('index.js test', ()=>{

    beforeAll(()=>{
        //connectDB();
      });
    
      afterAll(() => {
        disconnectDB();
      });
    it('should get main route', async ()=>{
        const res = await request(app).get('/')

        expect(res.status).toEqual(200);
        expect(res.body).toHaveProperty('message');
    })
})
