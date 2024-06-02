import { Router } from 'express';
import { getConsistency, getIrregularities } from '../controllers/consistencyController';

const router = Router();

/**
 * @route GET /api/consistency/identify
 * @desc Identifies the consistency of logging habits.
 */
router.get('/identify', getConsistency);

/**
 * @route GET /api/consistency/irregularities
 * @desc Detects irregularities or significant changes in the frequency or time of logs.
 */
router.get('/irregularities', getIrregularities);

export default router;
