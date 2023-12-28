import supertest from "supertest";
import app from "../app";
import { connectToDatabase, sequelize } from "../util/db";
import Blog from "../db/models/blog";
import User from "../db/models/user";

const api = supertest(app);
let blog : Blog;
let token : string;
beforeAll(async() => {
  
  await connectToDatabase();
  await User.sync({force: true});
  await  Blog.sync({force: true});
  await api.post("/api/users").send({username:"ivan", name:"IVAN", password: "validpassword"});
  blog = await Blog.create({content: "hello", important : true, userId: 1}); 
  const res = await api.post("/api/auth/").send({username: "ivan", password: "validpassword"});
  token = res.body.token as string;
});

describe(("/api/blogs"), () => {
    test('GET /api/blogs', async () => {
      await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
        ;
        
    });
    test("GET /users/:id", async () => {
      const res = await api
                        .get("/api/blogs/"+ blog.id)
                        .expect(200)
                        .expect('Content-Type', /application\/json/);
          expect(res.body.id).toBeDefined();
          expect(res.body.content).toBe("hello");
      }); 
      test("GET users/:id invalid id gets 404", async() => {
          await api.get("/api/blogs/fakeid")
                    .expect(404);
      });                
      test("POST /blogs valid input", async () => {
          const res = await api
                                .post("/api/blogs")
                                .set("Authorization", "Bearer "+ token)
                                .send({content: "Hello", important: true})
                                .expect(200)
                                .expect('Content-Type', /application\/json/);
        
          
           expect(res.body.content).toBe("Hello");
           expect(res.body.userId).toBeDefined();                     
      });
      test("POST /blogs valid input but no auth header", async () => {
                 await api
                          .post("/api/blogs")
                          .send({content: "Hello", important: true})
                          .expect(403);

        
                        
      });
      test("POST /blogs valid input but invalid auth header token", async () => {
        await api
                 .post("/api/blogs")
                 .send({content: "Hello", important: true})
                 .set("Authorization", "Bearer "+ token + "123")

                 .expect(403);
               
        });
      
        test("POST /blogs invalid input", async () => {
                        await api
                                .post("/api/blogs")
                                .set("Authorization", "Bearer "+ token)
                                .send({ important: true})
                                .expect(400);
        
          
                            
      });           
                    
                      
    });

    //TODO: GET /blogs/ID
    //TODO: POST /blogs/
    //TODO: PUT /blogs/:ID
    //TODO: DELETE /blogs/:ID
    


afterAll(async() => {
    
    await sequelize.close();
});