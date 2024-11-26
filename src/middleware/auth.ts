import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/authService';

export const validateApiKeyMiddleware = async (
    req: Request, 
    res: Response, 
    next: NextFunction
): Promise<void> => {
    try {
        const apiKey = req.headers['x-api-key'] as string | undefined;
        if (!apiKey) {
            res.status(401).json({ error: 'API 키가 필요합니다.' });
            return;
        }

        const isValid = await AuthService.validateApiKey(apiKey);
        if (!isValid) {
            res.status(401).json({ error: '유효하지 않은 API 키입니다.' });
            return;
        }

        next();
    } catch (error) {
        res.status(500).json({ error: 'API 키 검증 중 오류가 발생했습니다.' });
    }
}; 