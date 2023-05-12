import pg from 'pg';

const { query } = new pg.Pool({
  host: 'localhost',
  port: 5432,
  database: 'trips-tips',
});

export default query;
