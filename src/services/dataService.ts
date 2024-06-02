import fetchData from '../utils/fetchData';
import { UserProfile } from '../models/models';

export const getDataFromAPI = async (): Promise<UserProfile | null> => {
    return await fetchData();
};
