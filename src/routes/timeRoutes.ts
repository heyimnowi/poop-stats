import { Router } from 'express';
import { getAverageDuration, getCorrelationsWithRoutines } from '../controllers/timeController';

const router = Router();

router.get('/average-duration', getAverageDuration);
router.get('/correlations', getCorrelationsWithRoutines);

export default router;
