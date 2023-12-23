/* eslint-disable @typescript-eslint/no-unsafe-call */
import type { Migration } from '../util/db';

import {  DataTypes } from 'sequelize';
    
export const up: Migration = async ({ context}) => {
          // here go all migration changes
          await context.createTable("users", {
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
          });

          await context.createTable("blogs", {
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
              user_id : {
                  type: DataTypes.INTEGER,
                  allowNull: false,
                  references: { model: 'users', key: 'id'
              }
            
          }});
        };
export const down :Migration = async ({context}) => {
    await context.dropTable("users");
    await context.dropTable("blogs");
};