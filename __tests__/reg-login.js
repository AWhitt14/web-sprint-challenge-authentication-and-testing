const supertest = require("supertest")
const db = require('../database/dbConfig')
const server = require('../api/server')


beforeAll(async () => {
    await db("users").truncate()
})

afterAll(async () => {
    await db.destroy()
})

describe("registration and login", () => {
    it("test registration", async () => {
        const res = await supertest(server)
            .post("/api/auth/register")
            .send({username: "alex", password: "pass123"})
        expect(res.statusCode).toBe(201)
        expect(res.body[0].username).toEqual("alex")
    })

    it("login success",async () => {
        const res = await supertest(server)
            .post("/api/auth/login")
            .send({username: "alex", password: "pass123"})
        expect(res.statusCode).toBe(200)
        expect(res.body.message).toBe(`Hello alex`)
    })

    it("login fail", async () => {
        const res = await supertest(server)
            .post("/api/auth/login")
            .send({username: "alex", password: "pass121"})
        expect(res.statusCode).toBe(401)
        expect(res.body.message).toBe("invalid credentials")
        
    })

})