import { Router } from 'express';
import { getDayOfWeekFrequency, getWeekendWeekdayPatterns } from '../controllers/dayController';

const router = Router();

/**
 * @route GET /api/day/frequency
 * @desc Analyzes the frequency of logs on different days of the week.
 */
router.get('/frequency', getDayOfWeekFrequency);

/**
 * @route GET /api/day/patterns
 * @desc Detects patterns related to weekends vs. weekdays.
 */
router.get('/patterns', getWeekendWeekdayPatterns);

export default router;
