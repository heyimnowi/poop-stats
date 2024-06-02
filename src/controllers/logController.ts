import { Request, Response } from 'express';
import { Log } from '../models/log';

let logs: Log[] = [];

// Add a new log entry
export const addLog = (req: Request, res: Response): void => {
  const log: Log = req.body;
  logs.push(log);
  res.status(201).send('Log entry added');
};

// Retrieve all logs
export const getLogs = (req: Request, res: Response): void => {
  res.json(logs);
};

// Get statistics summary
export const getSummaryStats = (req: Request, res: Response): void => {
  const totalLogs = logs.length;
  if (totalLogs === 0) {
    res.json({ totalLogs, dailyAvg: 0 });
    return;
  }

  const startDate = new Date(logs[0].date);
  const endDate = new Date(logs[logs.length - 1].date);
  const daysDiff = (endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24) + 1;
  const dailyAvg = totalLogs / daysDiff;

  res.json({ totalLogs, dailyAvg });
};
