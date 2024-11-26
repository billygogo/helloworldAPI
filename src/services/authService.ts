import { database } from '../config/database';

interface DatabaseResult {
    rows: any[];
}

export class AuthService {
    static async saveApiKey(apiKey: string) {
        const query = 'INSERT INTO api_keys (key) VALUES (?) RETURNING *';
        const result = await database.query(query, [apiKey]) as DatabaseResult;
        return result.rows[0];
    }

    static async validateApiKey(apiKey: string): Promise<boolean> {
        const query = 'SELECT * FROM api_keys WHERE key = ?';
        const result = await database.query(query, [apiKey]) as DatabaseResult;
        return result.rows.length > 0;
    }
} 