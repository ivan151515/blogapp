import { Sequelize } from 'sequelize';
import { Umzug, SequelizeStorage } from 'umzug';
import { DATABASE_URL, DATABASE_TEST_URL } from '../config';

const db = process.env.NODE_ENV === 'test' 
  ? DATABASE_TEST_URL
  : DATABASE_URL;

const sequelize = new Sequelize(db as string);

const migrationConf = {
  migrations: {
    glob: 'src/migrations/*.ts',
  },
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // For self-signed certificates
    },
  },
  storage: new SequelizeStorage({ sequelize, tableName: 'migrations' }),
  context: sequelize.getQueryInterface(),
  logger: console,
};

const migrator = new Umzug(migrationConf);

export type Migration = typeof migrator._types.migration;

const runMigrations = async () => {
  const migrations = await migrator.up();
  console.log('Migrations up to date', {
    files: migrations.map((mig) => mig.name),
  });
};

const rollbackMigration = async () => {
  await sequelize.authenticate();
  const migrator = new Umzug(migrationConf);
  await migrator.down();
};

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();
    await runMigrations();
    console.log('database connected');
  } catch (err) {
    console.log('connecting database failed', err);
    return process.exit(1);
  }

  return null;
};

export {connectToDatabase, sequelize, rollbackMigration };
