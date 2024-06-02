import { Poop } from './models/models';

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
