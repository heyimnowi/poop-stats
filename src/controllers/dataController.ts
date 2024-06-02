import { Request, Response } from 'express';
import { calculateAverageLogs, identifyPeakTimes, calculateLogsOverPeriod } from '../frequency';
import fetchData from '../utils/fetchData';
import { UserProfile } from '../models/models';

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
