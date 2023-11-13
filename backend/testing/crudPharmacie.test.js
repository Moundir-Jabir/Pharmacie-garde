const request = require('supertest')
const app = require('../server')
const fs = require('fs')

const api = "/api/pharmacie";
const testImage = `${__dirname}/../imgtest.png`

describe('add pharmacie', () => {

    it('send data ', async () => {
        const res = await request(app)
            .post(api + "add")
            .set('content-type', 'multipart/form-data')
            .field('Nom', 'jdkjd')
            .field('NumeroTele', '0650043210')
            .field('Adresse', 'JJHKJH')
            .field('HeurOpen', '03:34')
            .field('Heurclose', '02:23')
            .attach('images', fs.readFileSync(`${__dirname}/imgtest.png`))

        expect(res.status).toEqual(200)
    })

    it('send data null ', async () => {
        const res = await request(app)
            .post(api + "/add")
            .send({
                Nom: "",
                Adresse: "",
                HeurOpen: "",
                HeurClose: "",
                NumeroTele: ""
            })

        expect(res.status).toEqual(400)
    })

})




//test unit for delete pharmacie
describe("when pharmacie is deleted", () => {
    it("should reponde with a 200 status code", async () => {
        const response = await request(app).delete("/api/pharmacie/deletePharmacie/63d0fb175d2f7879ddddc")
        expect(response.statusCode).toBe(400)
    })
})


//test unit for update pharmacie
describe("test for update farmacie", () => {
    
    //when data is missing
    it("should be provide an data after update pharmacie", async () => {
        const response = await request(app).put("/api/pharmacie/updatePharmacie/63d0fb175d2f7879ddddc")
            .send({
                Nom: "",
                Adresse: "",
                HeurOpen: "",
                HeurClose: "",
                NumeroTele: ""
            })
        expect(response.statusCode).toBe(400)
    })

    //when update seccufuly
    it("should be update seccufuly", async () => {
        const response = await request(app).put("/api/pharmacie/updatePharmacie/63d0fb175d2f7879ddddc")
            .send({
                Nom: "jdkjd",
                Adresse: "JJHKJH",
                HeurOpen: "03:34",
                HeurClose: "02:23",
                NumeroTele: "0650043210"
            })
        expect(response.statusCode).toBe(200)
    })

    //when pharmacie already exist
    it("should be not update because pharamcie already exist", async () => {
        const response = await request(app).put("/api/pharmacie/updatePharmacie/63d0fb175d2f7879ddddc")
            .send({
                Nom: "anaspharm",
                Adresse: "JJHKJH",
                HeurOpen: "03:34",
                HeurClose: "02:23",
                NumeroTele: "0650043210"
            })
        expect(response.statusCode).toBe(400)
    })
})


//test unit for find pharmacie
describe("test for find all and find one pharmacie", () => {
    //test unit for findAll pharmacie  
    
        //when findAll seccufuly
        it("should be findAll seccufuly", async () => {
            const res = await request(app).get("/api/pharmacie/getAllPharmacie/")
            expect(res.statusCode).toBe(200);
        });
    
    //test unit for findOne pharmacie  
    
        //when findOne seccufuly
        it("should be findOne seccufuly", async () => {
            const res = await (await request(app).get("/api/pharmacie/getOnePharmacie/63d0fb175d2f7879dddd"))
            expect(res.statusCode).toBe(200);
        });
    })