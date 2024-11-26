import express, { Request, Response } from 'express';
import { validateApiKeyMiddleware } from './middleware/auth';
import { AuthService } from './services/authService';

const app = express();
const PORT = 3000;

app.use(express.json());

// Hello World 엔드포인트 - API 키 검증 미들웨어 적용
app.get('/hello', validateApiKeyMiddleware, (req: Request, res: Response) => {
    res.json({ message: 'Hello, World!' });
});

// API 키 저장 엔드포인트
app.post('/api-keys', async (req: Request, res: Response) => {
    try {
        const { apiKey } = req.body;
        const savedKey = await AuthService.saveApiKey(apiKey);
        res.status(201).json(savedKey);
    } catch (error) {
        res.status(500).json({ error: '키 저장 중 오류 발생' });
    }
});

// API 키 확인 엔드포인트
app.get('/validate-api-key', async (req: Request, res: Response): Promise<void> => {
    try {
        const apiKey = req.headers['x-api-key'] as string | undefined;
        if (!apiKey) {
            res.status(401).json({ error: 'API 키가 필요합니다.' });
            return;
        }

        const isValid = await AuthService.validateApiKey(apiKey);
        if (isValid) {
            res.status(200).json({ message: '유효한 API 키입니다.' });
        } else {
            res.status(401).json({ error: '유효하지 않은 API 키입니다.' });
        }
    } catch (error) {
        res.status(500).json({ error: '키 확인 중 오류 발생' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});