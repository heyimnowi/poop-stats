import { Router } from 'express';
import { getData, getAverageLogs, getPeakTimes, getLogsOverPeriod } from '../controllers/frequencyController';

const router = Router();

router.get('/data', getData);
router.get('/average-logs', getAverageLogs);
router.get('/peak-times', getPeakTimes);
router.get('/logs-over-period', getLogsOverPeriod);

export default router;
