import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../../util/db";

interface ProfileAttributes {
    id: number,
    bio: string,
    userId: number,
    occupation: string,
    age: number,
    created: boolean
}

export interface ProfileInput extends Optional<ProfileAttributes, 'id'> {
}
export interface ProfileOutput extends Required<ProfileAttributes>{
    
}


class Profile extends Model<ProfileAttributes, ProfileInput> implements ProfileAttributes {
  public id!: number;
  public bio!: string;
  public userId!: number;
  public age!: number;
  public created!: boolean;
  public occupation!: string;
}

Profile.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      bio: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      created : {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      occupation : {
        type: DataTypes.STRING,

      },
      age : {
        type : DataTypes.INTEGER,
        validate : {
            max: 115,
            min: 1
        }
      },
      userId : {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: 'users', key: 'id'
        },
      
      }
    },
{
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'profile'
});

export default Profile;