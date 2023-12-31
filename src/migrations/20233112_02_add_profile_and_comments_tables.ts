/* eslint-disable @typescript-eslint/no-unsafe-call */
import type { Migration } from '../util/db';

import {  DataTypes } from 'sequelize';
    
export const up: Migration = async ({ context}) => {
          // here go all migration changes
          await context.createTable("profiles", {
            id: {
              type: DataTypes.INTEGER,
              primaryKey: true,
              autoIncrement: true
            },
            profile_image_url: {
              type: DataTypes.STRING,
            },
            age : {
                type: DataTypes.INTEGER,
            }, 
            occupation : {
                type : DataTypes.STRING
            },
            bio: {
              type: DataTypes.TEXT,
            },
            created : {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            },
            user_id : {
                type: DataTypes.INTEGER,
                allowNull : false,
                references : {model: "users", key: "id"}
            }
          });

          await context.createTable("comments", {
            id: {
              type: DataTypes.INTEGER,
              primaryKey: true,
              autoIncrement: true
            },
            content: {
              type: DataTypes.TEXT,
              allowNull: false
            },
            created_at : {
                type: DataTypes.DATE,
                allowNull: false
            },
            updated_at : {
                type: DataTypes.DATE,
                allowNull: false
            },
            user_id : {
                  type: DataTypes.INTEGER,
                  allowNull: false,
                  references: { model: 'users', key: 'id'
              },
            
            },
            blog_id : {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {model: "blogs", key: "id"}
            }
        });
        };
export const down :Migration = async ({context}) => {
    await context.dropTable("profiles");
    await context.dropTable("comments");
};