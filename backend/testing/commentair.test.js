const request = require('supertest')
const app = require('../server')

const api = "/api/commentair";
let idCommentair;
describe('add commentair', () => {

  it('send data null', async () => {
    const res = await request(app)
      .post(api + "/add")
      .send({
        Name: '',
        Commentair: '',
        Review: ''
      })

    expect(res.status).toEqual(400)
  })

  it('send data ', async () => {
    const res = await request(app)
      .post(api + "/add")
      .send({
        Name: "jjjj",
        Commentair: "jkjhk",
        Review: 2,
      })

    idCommentair = res.data._id;
    expect(res.status).toEqual(200)
  })

})


describe('delete commentair', () => {

  it('delete commentair', async () => {
    const res = await request(app)
      .delete(api + "/delete/" + idCommentair)
    expect(res.status).toEqual(200)

    console.log(idCommentair)
  })
})

//test unit for get all commentair
describe('get all commentair', () => {
  it('get all commentair', async () => {
    const res = await request(app)
      .get(api + "/getAllCommentaire")
    expect(res.status).toEqual(200)
  })
})

//test unit for count commentair
describe('count commentair', () => {
  it('count commentair', async () => {
    const res = await request(app)
      .get(api + "/countCommentair")
    expect(res.status).toEqual(200)
  })
})