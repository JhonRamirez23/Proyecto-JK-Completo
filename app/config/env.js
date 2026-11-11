import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Carga el .env desde la raíz del proyecto
dotenv.config({ path: path.resolve(__dirname, '../../.env'), override: true });

export const config = {
  port: Number(process.env.PORT) || 4000,
  nodeEnv: process.env.NODE_ENV || 'development',
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:4000',
  db: {
    type: process.env.DB_CLIENT || 'pg',
    host: process.env.DB_HOST || process.env.PGHOST || '127.0.0.1',
    user: process.env.DB_USER || process.env.PGUSER || 'postgres',
    password: process.env.DB_PASSWORD ?? process.env.PGPASSWORD ?? '',
    port: Number(process.env.DB_PORT || process.env.PGPORT || 5432),
    database: process.env.DB_NAME || process.env.PGDATABASE || 'cambiar_bd',
  },
};
