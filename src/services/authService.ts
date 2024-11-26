import { pool } from '../config/database';

export class AuthService {
    static async saveApiKey(apiKey: string) {
        const query = 'INSERT INTO api_keys (key) VALUES ($1) RETURNING *';
        const values = [apiKey];
        const res = await pool.query(query, values);
        return res.rows[0];
    }

    static async validateApiKey(apiKey: string): Promise<boolean> {
        const query = 'SELECT * FROM api_keys WHERE key = $1';
        const values = [apiKey];
        const res = await pool.query(query, values);
        return res.rows.length > 0;
    }
} 