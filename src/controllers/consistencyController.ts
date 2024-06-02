import { Request, Response } from 'express';
import { identifyConsistency, detectIrregularities } from '../utils/consistency';
import fetchData from '../utils/fetchData';
import { UserProfile } from '../models/models';

/**
 * Identifies the consistency of logging habits.
 * 
 * @route GET /api/consistency/identify
 * @returns {Object} Consistency analysis results.
 */
export const getConsistency = async (req: Request, res: Response) => {
    try {
        const data: UserProfile | null = await fetchData();
        if (data) {
            const consistency = identifyConsistency(data.poops);
            return res.json(consistency);
        } else {
            return res.status(500).json({ error: 'Failed to fetch data' });
        }
    } catch (error) {
        return res.status(500).json({ error: 'Failed to fetch data' });
    }
};

/**
 * Detects irregularities or significant changes in the frequency or time of logs.
 * 
 * @route GET /api/consistency/irregularities
 * @returns {Object} Irregularities analysis results.
 */
export const getIrregularities = async (req: Request, res: Response) => {
    try {
        const data: UserProfile | null = await fetchData();
        if (data) {
            const irregularities = detectIrregularities(data.poops);
            return res.json(irregularities);
        } else {
            return res.status(500).json({ error: 'Failed to fetch data' });
        }
    } catch (error) {
        return res.status(500).json({ error: 'Failed to fetch data' });
    }
};
