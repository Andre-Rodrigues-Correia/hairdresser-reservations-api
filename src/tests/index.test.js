const request = require('supertest')
const app = require('../../server')

describe('index.js test', ()=>{
    it('should get main route', async ()=>{
        const res = await request(app).get('/')

        expect(res.status).toEqual(200);
        expect(res.body).toHaveProperty('message');
    })
})
