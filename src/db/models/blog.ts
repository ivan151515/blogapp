import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../../util/db";
import User from "./user";

interface BlogAttributes {
    id: number,
    content: string,
    important: boolean,
    date?: string,
    userId: number
}
interface UserForBlog {
  username : string,
  name : string
}
export interface BlogInput extends Optional<BlogAttributes, 'id'> {
}
export interface BlogOutput extends Required<BlogAttributes>{
    user ?: UserForBlog
}


class Blog extends Model<BlogAttributes, BlogInput> implements BlogAttributes {
  public id!: number;
  public content!: string;
  public important!: boolean;
  public date!: string;
  public userId!: number;
}

Blog.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      important: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      },
      date: {
        type: DataTypes.DATE
      },
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: User,
          key: 'id'
      }

      }
    },
{
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'blog'
});

export default Blog;