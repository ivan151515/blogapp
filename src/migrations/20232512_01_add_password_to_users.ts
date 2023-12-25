/* eslint-disable @typescript-eslint/no-unsafe-call */
import type { Migration } from '../util/db';

import {  DataTypes } from 'sequelize';
    
export const up: Migration = async ({ context}) => {
          await context.addColumn("users", "password", {
            type : DataTypes.TEXT,
            allowNull: false,
            defaultValue: "fake"
          });

    
        };
export const down :Migration = async ({context}) => {
    await context.removeColumn("users", "password");
};