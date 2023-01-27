const app = require('../server')
const request = require('supertest')


describe('/POST /api/pharmacie/createPharmacie', () => {
    test('should respond status 400 if req.body is empty', async () => { 
        const res = await request(app).post('/api/pharmacie/createPharmacie').send({
            name : '',
            phone : '',
            address : '',
            date : '',

        })

        expect(res.statusCode).toBe(400)
     })

    //  test('should respond status 201 if pharmacie created successfuly', async () => { 
    //     const res = await request(app).post('/api/pharmacie/createPharmacie').send({
    //         name : 'Pharmacie andalous',
    //         phone : '0987654368',
    //         address : 'Qu oued salam ',
    //         date : '2023-12-12',
    //         img : 'boubkerr.png'
    //     })

    //     expect(res.statusCode).toBe(200)
    //   })

});


