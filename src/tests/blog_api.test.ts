import supertest, { Response } from "supertest";
import app from "../app";
import { connectToDatabase, sequelize } from "../util/db";
import Blog from "../db/models/blog";
import User from "../db/models/user";
import { Profile } from "../db/models";

const api = supertest(app);
let blog : Blog;
let token : string;
let user :Response;
let commentId : string;
beforeAll(async() => {
  
  await connectToDatabase();
  await User.sync({force: true});
  await  Blog.sync({force: true});
  await Profile.sync({force: true});
  user = await api.post("/api/users").send({username:"newestuser", name:"IVAN", password: "validpassword"});
  console.log(user);
  blog = await Blog.create({content: "hello", important : false, userId: Number(user.body.id as string)}); 
  const res = await api.post("/api/auth/").send({username: "newestuser", password: "validpassword"});
  token = res.body.token as string;
  const result = await api
                          .post("/api/blogs/"+ blog.id+"/comments")
                          .set("Authorization", "Bearer "+ token)
                          .send({content: "First Comment"});
  commentId = result.body.id as string;
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
          expect(res.body.user.username).toBe("newestuser");
          expect(res.body.user.password).not.toBeDefined();
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
describe("blog/:id/comments ", () => {
    test("POST /blogs/:id/comments happy path", async () => {
      const res = await api
                          .post("/api/blogs/"+ blog.id+"/comments")
                          .set("Authorization", "Bearer "+ token)
                          .send({content: "Nice comment"})
                          .expect(200)
                          .expect('Content-Type', /application\/json/);
            expect(res.body.content).toBeDefined();
            expect(res.body.userId).toBe(user.body.id);
    });
    test("POST /blog/:id/comments invalid auth token", async () => {
                  await api
                          .post("/api/blogs/"+ blog.id+"/comments")
                          .set("Authorization", "Bearer "+ token + 123)
                          .send({content: "Nice comment"})
                          .expect(403);
            
    });
    test("POST /blog/:id/comments invalid request body", async () => {
      await api
              .post("/api/blogs/"+ blog.id+"/comments")
              .set("Authorization", "Bearer "+ token)
              .send({})
              .expect(400);

});
test("PUT /blogs/:id/comments/:commentId valid input", async () => {
  const res = await api
                        .put("/api/blogs/"+ blog.id + "/comments/" + commentId)
                        .set("Authorization", "Bearer "+ token)
                        .send({content: "this comment is updated"})
                        .expect(200)
                        .expect('Content-Type', /application\/json/);

  
   expect(res.body.content).toBe("this comment is updated");
});
test("PUT /blogs/:id/comments/:commentId invalid input", async () => {
                await api
                        .put("/api/blogs/"+ blog.id + "/comments/" + commentId)
                        .set("Authorization", "Bearer "+ token)
                        .send()
                        .expect(400);

  
});
test("PUT /blogs/:ID/comments/:commentId valid input but invalid auth header token", async () => {
  await api
           .put("/api/blogs/"+ blog.id+ "/comments/" + commentId)
           .send({content: "Hello"})
           .set("Authorization", "Bearer "+ token + "123")

           .expect(403);
         
  });
  test("PUT /blogs/:id/comments/:commentId check for user not owner of comment, shouldnt be allowed to update the comment", async () => {
    await api.post("/api/users").send({username:"JOHN", name:"IVAN", password: "validpassword"});
    const res = await api.post("/api/auth/").send({username: "JOHN", password: "validpassword"});
    const userToken = res.body.token as string;
    await api
            .put("/api/blogs/"+ blog.id + "/comments/"+commentId)
            .set("Authorization", "Bearer "+ userToken)
            .send({content: "im trying something illegal"})
            .expect(403);
  
        
});  
test("DELETE /blogs/:id/comments/:commentId valid request", async () => {
              await api
                        .delete("/api/blogs/"+ blog.id + "/comments/" + commentId)
                        .set("Authorization", "Bearer "+ token)
                        .expect(204);
                        

  
   
});
test("DELETE /blogs/:id/comments/:commentId invalid id", async () => {
  await api
            .delete("/api/blogs/"+ blog.id + "/comments/" + "invalidID")
            .set("Authorization", "Bearer "+ token)
            .expect(400);
            



});
test("DELETE /blogs/:id/comments/:commentId user which is not owner of comment tries to delete it", async () => {
  await api.post("/api/users").send({username:"wrongUser", name:"IVAN", password: "validpassword"});
    const res = await api.post("/api/auth/").send({username: "wrongUser", password: "validpassword"});
    const userToken = res.body.token as string;

    const result = await api
                          .post("/api/blogs/"+ blog.id+"/comments")
                          .set("Authorization", "Bearer "+ token)
                          .send({content: "First Comment"});
  await api
            .delete("/api/blogs/"+ blog.id + "/comments/" + result.body.id)
            .set("Authorization", "Bearer "+ userToken)
            .expect(403);
            



});
});  
    //TODO: PUT /blogs/:ID
    //TODO: DELETE /blogs/:ID
    


afterAll(async() => {
    
    await sequelize.close();
});