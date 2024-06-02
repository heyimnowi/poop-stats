import { Poop } from '../models/models';

/**
 * Identifies the consistency of logging habits.
 * @param poops - Array of Poop objects
 * @returns {Object} - Consistency analysis results
 */
export const identifyConsistency = (poops: Poop[]) => {
    const daysWithLogs = new Set<string>();
    
    poops.forEach(poop => {
        const date = new Date(poop.created_at).toDateString();
        daysWithLogs.add(date);
    });

    const totalDays = (new Date(poops[poops.length - 1].created_at).getTime() - new Date(poops[0].created_at).getTime()) / (1000 * 3600 * 24);
    const consistency = daysWithLogs.size / totalDays;

    return { consistency, totalDays, daysWithLogs: daysWithLogs.size };
};

/**
 * Detects irregularities or significant changes in the frequency or time of logs.
 * @param poops - Array of Poop objects
 * @returns {Object} - Irregularities analysis results
 */
export const detectIrregularities = (poops: Poop[]) => {
    const intervals = [];

    for (let i = 1; i < poops.length; i++) {
        const previousLog = new Date(poops[i - 1].created_at).getTime();
        const currentLog = new Date(poops[i].created_at).getTime();
        intervals.push(currentLog - previousLog);
    }

    const mean = intervals.reduce((sum, interval) => sum + interval, 0) / intervals.length;
    const variance = intervals.reduce((sum, interval) => sum + Math.pow(interval - mean, 2), 0) / intervals.length;
    const standardDeviation = Math.sqrt(variance);

    return { mean, standardDeviation, intervals };
};
