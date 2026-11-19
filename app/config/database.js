import pg from 'pg';
import { config } from './env.js';

const { Pool } = pg;

const dbConfig = {
  host: config.db.host,
  user: config.db.user,
  password: String(config.db.password ?? ''),
  port: Number(config.db.port),
  database: config.db.database,
  // El proveedor de producción exige TLS; se conserva el modo actual en desarrollo.
  ssl: config.nodeEnv === 'production' ? { rejectUnauthorized: true } : false,
};

const pool = new Pool(dbConfig);

const getConnection = () => pool;

export default getConnection;
