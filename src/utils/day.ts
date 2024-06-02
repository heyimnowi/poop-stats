import { Poop } from '../models/models';

/**
 * Analyzes the frequency of logs on different days of the week.
 * @param poops - Array of Poop objects
 * @returns {Object} - Frequency analysis results by day of the week
 */
export const analyzeDayOfWeekFrequency = (poops: Poop[]) => {
    const dayFrequency = Array(7).fill(0);  // Array to hold counts for each day of the week

    poops.forEach(poop => {
        const day = new Date(poop.created_at).getDay();  // getDay returns 0 for Sunday, 1 for Monday, etc.
        dayFrequency[day]++;
    });

    return dayFrequency;
};

/**
 * Detects patterns related to weekends vs. weekdays.
 * @param dayFrequency - Array of log counts by day of the week
 * @returns {Object} - Analysis results for weekends vs. weekdays
 */
export const detectWeekendWeekdayPatterns = (dayFrequency: number[]) => {
    const weekdayCount = dayFrequency.slice(1, 6).reduce((acc, count) => acc + count, 0);
    const weekendCount = dayFrequency[0] + dayFrequency[6];
    const totalLogs = dayFrequency.reduce((acc, count) => acc + count, 0);
    const weekdayPercentage = (weekdayCount / totalLogs) * 100;
    const weekendPercentage = (weekendCount / totalLogs) * 100;

    return { weekdayCount, weekendCount, weekdayPercentage, weekendPercentage };
};
