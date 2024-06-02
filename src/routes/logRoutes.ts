import { Router } from 'express';
import { addLog, getLogs, getSummaryStats } from '../controllers/logController';

const router = Router();

router.post('/', addLog);
router.get('/', getLogs);
router.get('/stats/summary', getSummaryStats);

export default router;
