import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../../util/db";

interface BlogAttributes {
    id: number,
    content: string,
    important: boolean,
    date: string,
    userId: number
}

export interface BlogInput extends Optional<BlogAttributes, 'id' | 'userId' | "date"> {}
export interface BlogOutput extends Required<BlogAttributes>{}


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
      userId : {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: 'users', key: 'id'
        }
    }},
{
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'blog'
});

export default Blog;