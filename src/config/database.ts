import sqlite3 from 'sqlite3';
import path from 'path';

// 데이터베이스 파일 경로 설정
const dbPath = path.join(__dirname, '../../database.sqlite');

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database:', err);
    } else {
        console.log('Database connected');
        // 테이블 생성
        db.run(`
            CREATE TABLE IF NOT EXISTS api_keys (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                key TEXT UNIQUE NOT NULL,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        `);
    }
});

export const database = {
    async query(sql: string, params: any[] = []): Promise<{ rows: any[] }> {
        return new Promise((resolve, reject) => {
            if (sql.toLowerCase().startsWith('select')) {
                db.all(sql, params, (err, rows) => {
                    if (err) reject(err);
                    else resolve({ rows: rows || [] });
                });
            } else {
                db.run(sql, params, function(err) {
                    if (err) reject(err);
                    else resolve({ rows: [{ id: this.lastID, changes: this.changes }] });
                });
            }
        });
    },
    
    async close(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            db.close((err) => {
                if (err) reject(err);
                else resolve(true);
            });
        });
    }
}; 