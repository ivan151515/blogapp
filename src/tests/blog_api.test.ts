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
  const user = await api.post("/api/users").send({username:"ivan", name:"IVAN", password: "validpassword"});
  blog = await Blog.create({content: "hello", important : false, userId: Number(user.body.id as string)}); 
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
    test("GET /blogs/:id", async () => {
      const res = await api
                        .get("/api/blogs/"+ blog.id)
                        .expect(200)
                        .expect('Content-Type', /application\/json/);
          expect(res.body.id).toBeDefined();
          expect(res.body.content).toBe("hello");
          expect(res.body.user).toBeDefined();
          expect(res.body.user.username).toBe("ivan");
      }); 
      test("GET blogs/:id invalid id gets 404", async() => {
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
      test("PUT /blogs/:id valid input", async () => {
        const res = await api
                              .put("/api/blogs/"+ blog.id)
                              .set("Authorization", "Bearer "+ token)
                              .send({important: true})
                              .expect(200)
                              .expect('Content-Type', /application\/json/);
      
        
         expect(res.body.important).toBe(true);
    });        
    test("PUT /blogs/:ID valid input but invalid auth header token", async () => {
      await api
               .put("/api/blogs/"+ blog.id)
               .send({content: "Hello", important: true})
               .set("Authorization", "Bearer "+ token + "123")

               .expect(403);
             
      });
      //TODO: MAKE A TEST FOR CHECKING WITH USER THAT IS NOT OWNER OF THE BLOG
      test("PUT /blogs/:id check for user not owner of blog, shouldnt be allowed to update the blog", async () => {
        await api.post("/api/users").send({username:"steven", name:"IVAN", password: "validpassword"});
        const res = await api.post("/api/auth/").send({username: "steven", password: "validpassword"});
        const userToken = res.body.token as string;
        await api
                .put("/api/blogs/"+ blog.id)
                .set("Authorization", "Bearer "+ userToken)
                .send({important: true})
                .expect(403);
      
            
});               
    });

    
    
    //TODO: PUT /blogs/:ID
    //TODO: DELETE /blogs/:ID
    


afterAll(async() => {
    
    await sequelize.close();
});