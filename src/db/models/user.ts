import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../../util/db";

interface UserAttributes {
  id: number,
  username: string,
  name: string,
  password: string,
}

export interface UserInput extends Optional<UserAttributes, 'id'> {}
export interface UserOutput extends Required<UserAttributes>{}

class User extends Model<UserAttributes, UserInput> implements UserAttributes{
  public id!: number;
  public username!: string;
  public name!: string;
  public password!: string;
}

User.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      password: {
        type: DataTypes.TEXT,
        allowNull: false,
        
      }
},
{
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'user'
});

export default User;