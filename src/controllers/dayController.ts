import { Request, Response } from 'express';
import { analyzeDayOfWeekFrequency, detectWeekendWeekdayPatterns } from '../utils/day';
import fetchData from '../utils/fetchData';
import { UserProfile } from '../models/models';

/**
 * Analyzes the frequency of logs on different days of the week.
 * 
 * @route GET /api/day/frequency
 * @returns {Object} Frequency analysis results by day of the week.
 */
export const getDayOfWeekFrequency = async (req: Request, res: Response) => {
    try {
        const data: UserProfile | null = await fetchData();
        if (data) {
            const dayFrequency = analyzeDayOfWeekFrequency(data.poops);
            return res.json(dayFrequency);
        } else {
            return res.status(500).json({ error: 'Failed to fetch data' });
        }
    } catch (error) {
        return res.status(500).json({ error: 'Failed to fetch data' });
    }
};

/**
 * Detects patterns related to weekends vs. weekdays.
 * 
 * @route GET /api/day/patterns
 * @returns {Object} Analysis results for weekends vs. weekdays.
 */
export const getWeekendWeekdayPatterns = async (req: Request, res: Response) => {
    try {
        const data: UserProfile | null = await fetchData();
        if (data) {
            const dayFrequency = analyzeDayOfWeekFrequency(data.poops);
            const patterns = detectWeekendWeekdayPatterns(dayFrequency);
            return res.json(patterns);
        } else {
            return res.status(500).json({ error: 'Failed to fetch data' });
        }
    } catch (error) {
        return res.status(500).json({ error: 'Failed to fetch data' });
    }
};
