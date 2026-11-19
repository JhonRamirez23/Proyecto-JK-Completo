import pg from 'pg';
import { config } from './env.js';

const { Pool } = pg;

const isVercelDeployment = ['production', 'preview'].includes(process.env.VERCEL_ENV);
const useSsl = config.nodeEnv === 'production' || isVercelDeployment;

const dbConfig = {
  host: config.db.host,
  user: config.db.user,
  password: String(config.db.password ?? ''),
  port: Number(config.db.port),
  database: config.db.database,
  // El proveedor remoto exige TLS en Production y Preview; se conserva el modo local.
  ssl: useSsl ? { rejectUnauthorized: true } : false,
};

const pool = new Pool(dbConfig);

const getConnection = () => pool;

export default getConnection;
