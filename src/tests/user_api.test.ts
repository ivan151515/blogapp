import supertest from "supertest";
import app from "../app";
import { connectToDatabase, sequelize } from "../util/db";
import User from "../db/models/user";

const api = supertest(app);
let user: User;
let userId : string;
let userToken: string;
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
         const res =await api
                  .post("/api/users")
                  .send({
                    username: "amnadsasd", 
                    name : "test",
                    password: "validPassword"
                    })
                    .expect(200)
                    .expect('Content-Type', /application\/json/);
                    console.log(res.body);
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
              expect(res.body.blogs).toBeDefined();
              expect(res.body.password).not.toBeDefined();
              expect(res.body.profile).toBeDefined();
    }); 
    test("GET users/:id invalid id gets 404", async() => {
              await api.get("/api/users/fakeid")
                        .expect(404);
    });                
    test("PUT users/:id update profile happy path",async () => {
        const user = await api.post("/api/users").send({username:"JOHN", name:"IVAN", password: "validpassword"});
        const res = await api.post("/api/auth/").send({username: "JOHN", password: "validpassword"});
        userToken = res.body.token as string;
        userId = user.body.id as string;
        const response = await api.put("/api/users/" + userId)
                                  .set("Authorization", "Bearer "+ userToken)
                                  .send({bio: "Hi im me", age: 21})
                                  .expect(200)
                                  .expect('Content-Type', /application\/json/);
        console.log(response.body);
        expect(response.body.created).toBe(true);
        expect(response.body.bio).toBe("Hi im me");

    });    
    test("PUT users/:id invalid age", async () => {

                        await api.put("/api/users/"+ userId)
                                .set("Authorization", "Bearer "+ userToken)
                                .send({bio: "Hi im me", age: -21})
                                .expect(400);
    });    
    test("PUT users/:id user which doesnt own the profile tries to update it", async () => {
        await api.post("/api/users").send({username:"wrong", name:"IVAN", password: "validpassword"});
        const res = await api.post("/api/auth/").send({username: "wrong", password: "validpassword"});
        await api.put("/api/users/"+ userId)
              .set("Authorization", "Bearer "+ res.body.token)
              .send({bio: "Hi im me", age: 21})
              .expect(403);
});                
    });

    //TODO: GET /USERS/ID
    //TODO: POST /USERS/
    //TODO: PUT /USERS/:ID
    //TODO: DELETE /USERS/:ID
    


afterAll(async() => {
    await User.sync({force: true});
    await sequelize.close();
});