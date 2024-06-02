import { Poop } from '../models/models';

export const calculateAverageDurationBetweenLogs = (poops: Poop[]): number => {
    if (poops.length < 2) return 0;

    let totalDuration = 0;
    for (let i = 1; i < poops.length; i++) {
        const previousLog = new Date(poops[i - 1].created_at).getTime();
        const currentLog = new Date(poops[i].created_at).getTime();
        totalDuration += (currentLog - previousLog);
    }

    return totalDuration / (poops.length - 1);
};

export const findCorrelationsWithDailyRoutines = (poops: Poop[]): { [key: string]: number } => {
    const routineTimes: { [key: string]: number } = {};

    poops.forEach(poop => {
        const hour = new Date(poop.created_at).getHours();
        if (!routineTimes[hour]) {
            routineTimes[hour] = 0;
        }
        routineTimes[hour]++;
    });

    return routineTimes;
};
