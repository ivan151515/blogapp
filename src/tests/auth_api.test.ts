import supertest from "supertest";
import app from "../app";
import { connectToDatabase, sequelize } from "../util/db";
import User from "../db/models/user";

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
    afterAll(async() => {
        await sequelize.close();
    });
});

