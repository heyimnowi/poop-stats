import axios from 'axios';

const fetchData = async () => {
    try {
        const response = await axios.get('https://api.poopmap.net/api/v1/public_links/34338ce345a7fa484896cee9fcbd7831');
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
};

export default fetchData;
