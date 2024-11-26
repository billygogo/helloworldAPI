import express from 'express';
import { pool } from '../config/database';

const router = express.Router();

router.get('/hello', async (req, res) => {
    // 위의 라우트 핸들러 로직
});

export default router; 