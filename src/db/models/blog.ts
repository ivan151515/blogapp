import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../util/db";
class Blog extends Model {}

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