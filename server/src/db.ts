import { Pool } from 'pg';

export const pool = new Pool({
  user: 'postgres',
  password: 'pass',
  host: 'localhost',
  database: 'finance',
  port: 5432,
});
