import pg from 'pg';

const pool = new pg.Pool({
  host: 'localhost',
  user: 'postgres',
  password: 'asdfghjkl',
  port: 5433,
  database: 'trips-tips',
});

export default pool.query;
