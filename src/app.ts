import express, { Request, Response } from 'express';
import { calculateAverageRating, calculateAverageLogs, identifyPeakTimes } from './frequency';
import { UserProfile } from './models/models';
import fetchData from './fetchData';

const app = express();
const PORT = 3000;

app.get('/api/data', async (req: Request, res: Response) => {
    try {
        const data: UserProfile = await fetchData();
        if (data) {
            const averageRating = calculateAverageRating(data.poops);
            return res.json({ ...data, averageRating });
        } else {
            return res.status(500).json({ error: 'Failed to fetch data' });
        }
    } catch (error) {
        return res.status(500).json({ error: 'Failed to fetch data' });
    }
});

app.get('/api/average-logs', async (req: Request, res: Response) => {
    try {
        const data: UserProfile = await fetchData();
        if (data) {
            const averages = calculateAverageLogs(data.poops, data.account_days);
            return res.json(averages);
        } else {
            return res.status(500).json({ error: 'Failed to fetch data' });
        }
    } catch (error) {
        return res.status(500).json({ error: 'Failed to fetch data' });
    }
});

app.get('/api/peak-times', async (req: Request, res: Response) => {
    try {
        const data: UserProfile = await fetchData();
        if (data) {
            const peakTimes = identifyPeakTimes(data.poops);
            return res.json({ peakTimes });
        } else {
            return res.status(500).json({ error: 'Failed to fetch data' });
        }
    } catch (error) {
        return res.status(500).json({ error: 'Failed to fetch data' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
