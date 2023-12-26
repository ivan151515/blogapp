import supertest from "supertest";
import app from "../app";
import { connectToDatabase, sequelize } from "../util/db";
import Blog from "../models/blog";
import User from "../models/user";

const api = supertest(app);
let blog : Blog;
beforeAll(async() => {
  
  await connectToDatabase();
  await User.sync({force: true});
  await  Blog.sync({force: true});
  const user = await User.create({username: "ivan", name: "lame", password: "validpassword"});
  blog = await Blog.create({content: "hello", important : true, userId: user.get("id")});
  
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
                        .get("/api/blogs/"+ blog.getDataValue("id"))
                        .expect(200)
                        .expect('Content-Type', /application\/json/);
                        expect(res.body.id).toBeDefined();
                        expect(res.body.content).toBe("hello");
                    }); 
    test("GET users/:id invalid id gets 404", async() => {
                        await api.get("/api/blogs/fakeid")
                                  .expect(404);
    });     
                   
                    
                      
    });

    //TODO: GET /blogs/ID
    //TODO: POST /blogs/
    //TODO: PUT /blogs/:ID
    //TODO: DELETE /blogs/:ID
    


afterAll(async() => {
    
    await sequelize.close();
});