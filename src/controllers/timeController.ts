import { Request, Response } from 'express';
import fetchData from '../utils/fetchData';
import { UserProfile } from '../models/models';
import { calculateAverageDurationBetweenLogs, findCorrelationsWithDailyRoutines } from '../utils/time';

/**
 * Calculates the average duration between logs.
 * 
 * @route GET /api/time/average-duration
 * @returns {Object} Average duration between logs.
 */
export const getAverageDuration = async (req: Request, res: Response) => {
    try {
        const data: UserProfile | null = await fetchData();
        if (data) {
            const averageDuration = calculateAverageDurationBetweenLogs(data.poops);
            return res.json({ averageDuration });
        } else {
            return res.status(500).json({ error: 'Failed to fetch data' });
        }
    } catch (error) {
        return res.status(500).json({ error: 'Failed to fetch data' });
    }
};

/**
 * Compares log times to find correlations with daily routines or activities.
 * 
 * @route GET /api/time/correlations
 * @returns {Object} Correlations with daily routines.
 */
export const getCorrelationsWithRoutines = async (req: Request, res: Response) => {
    try {
        const data: UserProfile | null = await fetchData();
        if (data) {
            const correlations = findCorrelationsWithDailyRoutines(data.poops);
            return res.json(correlations);
        } else {
            return res.status(500).json({ error: 'Failed to fetch data' });
        }
    } catch (error) {
        return res.status(500).json({ error: 'Failed to fetch data' });
    }
};
