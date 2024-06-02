import { Poop } from '../models/models';

export const calculateAverageLogs = (poops: Poop[], accountDays: number) => {
    const totalPoops = poops.length;
    const averagePerDay = totalPoops / accountDays;
    const averagePerWeek = totalPoops / (accountDays / 7);
    const averagePerMonth = totalPoops / (accountDays / 30); // Roughly
    return {
        averagePerDay,
        averagePerWeek,
        averagePerMonth,
    };
};

export const calculateAverageRating = (poops: Poop[]): number => {
    if (!poops.length) return 0;
    const totalRating = poops.reduce((sum, poop) => sum + poop.rating, 0);
    return totalRating / poops.length;
};

export const identifyPeakTimes = (poops: Poop[]) => {
    const hours = new Array(24).fill(0);

    poops.forEach(poop => {
        const date = new Date(poop.created_at);
        const hour = date.getHours();
        hours[hour]++;
    });

    const maxLogs = Math.max(...hours);
    const peakHours = hours.map((count, index) => count === maxLogs ? index : -1).filter(hour => hour !== -1);

    return peakHours;
};

export const calculateLogsOverPeriod = (poops: Poop[], startDate: Date, endDate: Date) => {
    return poops.filter(poop => {
        const poopDate = new Date(poop.created_at);
        return poopDate >= startDate && poopDate <= endDate;
    }).length;
};
