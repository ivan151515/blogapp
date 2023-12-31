import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../../util/db";

interface CommentAttributes {
    id: number,
    content: string,
    blogId: number,
    userId: number
}

export interface CommentInput extends Optional<CommentAttributes, 'id'> {
}
export interface CommentOutput extends Required<CommentAttributes>{
    
}


class Comment extends Model<CommentAttributes, CommentInput> implements CommentAttributes {
  public id!: number;
  public content!: string;
  public userId!: number;
  public blogId!: number;
}

Comment.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      
      userId : {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: 'users', key: 'id'
        },
      
      },
      blogId : {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {model: "blogs", key: "id"}
      }
    },
{
    sequelize,
    underscored: true,
    timestamps: true,
    modelName: 'comment'
});

export default Comment;