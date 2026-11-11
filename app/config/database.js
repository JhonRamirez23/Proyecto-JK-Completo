import pg from 'pg';
import { config } from './env.js';

const { Pool } = pg;

const dbConfig = {
  host: config.db.host,
  user: config.db.user,
  password: String(config.db.password ?? ''),
  port: Number(config.db.port),
  database: config.db.database,
};

const pool = new Pool(dbConfig);

const getConnection = () => pool;

export default getConnection;
