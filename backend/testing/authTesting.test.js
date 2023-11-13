const supertest = require('supertest')
const app = require('../server')

// test unit for login
describe("------------------test for login function--------------------", () => {

    describe("when email and password is missing", () => {

        test('should reponde with a status code 400', async () => {
            const response = await supertest(app).post("/api/auth/login").send({
                email: "",
                password: ""
            })
            expect(response.statusCode).toBe(400)
        })

    })
    describe("given a valid email and password", () => {

        test('should reponde with a 200 status code', async () => {
            const response = await supertest(app).post("/api/auth/login").send({
                email: "chaimaetoumy5@gmail.com",
                password: "test"
            })
            expect(response.statusCode).toBe(200)
        })
    })
    describe("given incorrect password", () => {

        test('should reponde with a 400 status code', async () => {
            const response = await supertest(app).post("/api/auth/login").send({
                email: "chaimaetoumy5@gmail.com",
                password: "code"
            })
            expect(response.statusCode).toBe(400)
        })

    })
    describe("user not found", () => {

        test('should reponde with a 404 status code', async () => {
            const response = await supertest(app).post("/api/auth/login").send({
                email: "admin@gmail.com",
                password: "admin"
            })
            expect(response.statusCode).toBe(404)
        })

    })

})

// // test unit for forgetPassword
describe("---------------test for forgot password ---------------", () => {
    describe("when email is missing", () => {
        test("should reponde with a 400 status code", async () => {
            const response = await supertest(app).post("/api/auth/forgotpassword").send({
                email: ""
            })
            expect(response.statusCode).toBe(400)
        })
    })
    describe("when user is not found", () => {
        test("sould reponde with a 404 status code", async () => {
            const response = await supertest(app).post("/api/auth/forgotpassword").send({
                email: "chaimaa@gmail.com"
            })
            expect(response.statusCode).toBe(404)
        })
    })
    describe("when email is correct", () => {
        test("sould reponde with a 200 status code", async () => {
            const response = await supertest(app).post("/api/auth/forgotpassword").send({
                email: "chaimaetoumy5@gmail.com"
            })
            expect(response.statusCode).toBe(200)
        })
    })

})

// //test unit for reset password
describe("-------------------test for reset password -------------", () => {
    describe("when token is missing", () => {
        test("should reponde with a 404 status code", async () => {
            const response = await supertest(app).post("/api/auth/resetpassword").send({
                password: "admin"
            })
            expect(response.statusCode).toBe(404)
        })
    })
    describe("when password is missing", () => {
        test("should reponde with a 400 status code", async () => {
            const response = await supertest(app).post("/api/auth/resetpassword/test").send({
                password: ""
            })
            expect(response.statusCode).toBe(400)
        })
    })
})