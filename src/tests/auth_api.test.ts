import supertest from "supertest";
import app from "../app";
import { connectToDatabase, sequelize } from "../util/db";
import User from "../db/models/user";

let token  : string = "";
const api = supertest(app);
beforeAll(async() => {
  await connectToDatabase();
    await User.sync({force: true});
   await api.post("/api/users").send({username: "BROKI", password: "password", name: "anda"});
});

describe("Log in", () => {
    test("Correct credentials successfull log in", async() => {
        const res = await api.post("/api/auth")
            .send({username: "BROKI", password: "password"})
            .expect(200)
            .expect('Content-Type', /application\/json/);

        expect(res.body.token).toBeDefined();
        token = res.body.token as string;
        expect(res.body.username).toBe("BROKI");
    });
    test("Incorrect password failed log in", async() => {
        await api.post("/api/auth")
            .send({username: "BROKI", password: "wrongpassword"})
            .expect(403);

       
    });
    test("Incorrect username failed log in", async() => {
        await api.post("/api/auth")
            .send({username: "steven", password: "wrongpassword"})
            .expect(403);
    });

    test("get /api/auth verifying token on app refresh/start valid token", async () => {
        const res = await api.get("/api/auth")
                    .set("Authorization", "Bearer "+ token)
                    .expect(200)
                    .expect('Content-Type', /application\/json/);
        expect(res.body.username).toBeDefined();
        expect(res.body.id).toBeDefined();
    });

    test("get /api/auth verifying token on app refresh/start invalid token", async () => {
        await api.get("/api/auth")
                    .set("Authorization", "Bearer "+ token+ "123")
                    .expect(403);
        
    });

    afterAll(async() => {
        await sequelize.close();
    });
});

