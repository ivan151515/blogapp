import Blog from "./blog";
import User from "./user";

User.hasMany(Blog);
Blog.belongsTo(User);

export default {User, Blog};