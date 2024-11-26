import { Pool } from 'pg';

export const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'APIService',
    password: 'oxford',
    port: 5433,
}); 