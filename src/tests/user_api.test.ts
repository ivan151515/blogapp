import supertest from "supertest";
import app from "../app";
import { connectToDatabase, sequelize } from "../util/db";
import User from "../db/models/user";

const api = supertest(app);
let user: User;
beforeAll(async() => {
  await connectToDatabase();
    await User.sync({force: true});
   user =await User.create({
    username: "Ivan",
    name: "test",
    password: "password"
  });
});

describe(("/api/users"), () => {
    test('GET /api/users', async () => {
      const result = await api
        .get('/api/users')
        .expect(200)
        .expect('Content-Type', /application\/json/)
        ;
        expect(result.body.length).toBe(1);
    });
    test("POST /api/users successfull", async() => {
         await api
              .post("/api/users")
              .send({
                username: "amnadsasd", 
                name : "test",
                password: "validPassword"
                })
                .expect(200)
                .expect('Content-Type', /application\/json/);
              });
    test("POST /api/users, username already taken, invalid inputs", async () => {
                      await api.post("/api/users")
                            .send({
                              username: "Ivan", 
                              name : "test",
                              password: "validPassword"
                              })
                              .expect(403);

                    let res = await api.post("/api/users").send({
                                username: "eliah", 
                                name : "test",
                                password: "short"
                                })
                                .expect(400);
                    expect(res.body.errors[0].message).toContain("password");
                    await api.post("/api/users").send({
                      
                      name : "test",
                      password: "short"
                      })
                      .expect(400);
                    res = await api.post("/api/users").send({
                                username: "er", 
                                name : "test",
                                password: "validPassword"
                                })
                                .expect(400);
                      expect(res.body.errors[0].message).toContain("username");
                      res = await api.post("/api/users").send({
                                  username: "steeven", 
                                  name : "s",
                                  password: "validPassword"
                                  })
                                  .expect(400);
                        expect(res.body.errors[0].message).toContain("name");
                    });
    test("GET /users/:id", async () => {
                const res = await api
                                  .get("/api/users/"+ user.id)
                                  .expect(200)
                                  .expect('Content-Type', /application\/json/);
              expect(res.body.id).toBeDefined();
              expect(res.body.username).toBe("Ivan");
    }); 
    test("GET users/:id invalid id gets 404", async() => {
              await api.get("/api/users/fakeid")
                        .expect(404);
    });                
                    
                      
    });

    //TODO: GET /USERS/ID
    //TODO: POST /USERS/
    //TODO: PUT /USERS/:ID
    //TODO: DELETE /USERS/:ID
    


afterAll(async() => {
    await sequelize.close();
});