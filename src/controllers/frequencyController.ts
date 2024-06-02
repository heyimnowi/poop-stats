import { Request, Response } from 'express';
import { calculateAverageLogs, identifyPeakTimes, calculateLogsOverPeriod } from '../utils/frequency';
import fetchData from '../utils/fetchData';
import { UserProfile } from '../models/models';

/**
 * Retrieves user data and calculates average logs.
 * 
 * @route GET /api/data
 * @returns {UserProfile} User data with average logs.
 */
export const getData = async (req: Request, res: Response) => {
    try {
        const data: UserProfile | null = await fetchData();
        if (data) {
            const averageRating = calculateAverageLogs(data.poops, data.account_days);
            return res.json({ ...data, averageRating });
        } else {
            return res.status(500).json({ error: 'Failed to fetch data' });
        }
    } catch (error) {
        return res.status(500).json({ error: 'Failed to fetch data' });
    }
};

/**
 * Calculates and returns the average number of logs per day, week, and month.
 * 
 * @route GET /api/average-logs
 * @returns {Object} Average logs per day, week, and month.
 */
export const getAverageLogs = async (req: Request, res: Response) => {
    try {
        const data: UserProfile | null = await fetchData();
        if (data) {
            const averages = calculateAverageLogs(data.poops, data.account_days);
            return res.json(averages);
        } else {
            return res.status(500).json({ error: 'Failed to fetch data' });
        }
    } catch (error) {
        return res.status(500).json({ error: 'Failed to fetch data' });
    }
};

/**
 * Identifies peak times of day for logging.
 * 
 * @route GET /api/peak-times
 * @returns {Object} Peak times of day for logging.
 */
export const getPeakTimes = async (req: Request, res: Response) => {
    try {
        const data: UserProfile | null = await fetchData();
        if (data) {
            const peakTimes = identifyPeakTimes(data.poops);
            return res.json({ peakTimes });
        } else {
            return res.status(500).json({ error: 'Failed to fetch data' });
        }
    } catch (error) {
        return res.status(500).json({ error: 'Failed to fetch data' });
    }
};

/**
 * Calculates the total number of logs over a specified period.
 * 
 * @route GET /api/logs-over-period
 * @query {string} start - The start date (YYYY-MM-DD).
 * @query {string} end - The end date (YYYY-MM-DD).
 * @returns {Object} Total number of logs over the specified period.
 */
export const getLogsOverPeriod = async (req: Request, res: Response) => {
    try {
        const { start, end } = req.query;
        if (!start || !end) {
            return res.status(400).json({ error: 'Please provide start and end query parameters' });
        }

        const startDate = new Date(start as string);
        const endDate = new Date(end as string);

        if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
            return res.status(400).json({ error: 'Invalid date format' });
        }

        const data: UserProfile | null = await fetchData();
        if (data) {
            const totalLogs = calculateLogsOverPeriod(data.poops, startDate, endDate);
            return res.json({ totalLogs });
        } else {
            return res.status(500).json({ error: 'Failed to fetch data' });
        }
    } catch (error) {
        return res.status(500).json({ error: 'Failed to fetch data' });
    }
};
