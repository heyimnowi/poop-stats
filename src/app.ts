import express from 'express';
import frequency from './routes/frequencyRoutes';
import timeRoutes from './routes/timeRoutes';

const app = express();
const PORT = 3000;

app.use('/api/frequency', frequency);
app.use('/api/time', timeRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
