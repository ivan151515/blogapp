import Blog from "./blog";
import Comment from "./comment";
import Profile from "./profile";
import User from "./user";

User.hasMany(Blog);
Blog.belongsTo(User);
Blog.hasMany(Comment);
User.hasMany(Comment);
Comment.belongsTo(User);
Comment.belongsTo(Blog);

User.hasOne(Profile);
Profile.belongsTo(User);

export {User, Blog, Comment, Profile};