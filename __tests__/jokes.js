const supertest = require("supertest")
const db = require('../database/dbConfig')
const server = require('../api/server');
const { request } = require("../api/server");
const { default: expectCt } = require("helmet/dist/middlewares/expect-ct");

let token;

beforeAll(async () => {
   const res = await supertest(server)
    .post("/api/auth/login")
    .send({username: "alex", password: "pass123"})
    console.log(res.body.token)
    token = res.body.token;
    
})

afterAll(async () => {
    await db.destroy()
})
 
describe("jokes without auth", ()=> {
    test("jokes without token",async () => {
        const res = await supertest(server)
            .get("/api/jokes")
        expect(res.statusCode).toBe(401)
    })
    // test("jokes with token",async () => {
    //     const res = await supertest(server)
    //         .get("/api/jokes")
    //         .send({cookies: {token: token}})
    //     expect(res.statusCode).toBe(200)
    // })
})