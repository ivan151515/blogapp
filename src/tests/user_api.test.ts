import supertest from "supertest";
import app from "../app";
import { connectToDatabase, sequelize } from "../util/db";

const api = supertest(app);

beforeAll(async() => {
  await connectToDatabase();
});

describe(("/api/users"), () => {
    test('GET /api/users', async () => {
      await api
        .get('/api/users')
        .expect(200)
        .expect('Content-Type', /application\/json/);
    });
    //TODO: GET /USERS/ID
    //TODO: POST /USERS/
    //TODO: PUT /USERS/:ID
    //TODO: DELETE /USERS/:ID
    
});

afterAll(async() => {
    await sequelize.close();
});