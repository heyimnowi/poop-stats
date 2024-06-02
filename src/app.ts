import express from 'express';
import frequencyRoutes from './routes/frequencyRoutes';
import timeRoutes from './routes/timeRoutes';
import consistencyRoutes from './routes/consistencyRoutes';
import dayRoutes from './routes/dayRoutes';

const app = express();
const PORT = 3000;

app.use('/api/frequency', frequencyRoutes);
app.use('/api/time', timeRoutes);
app.use('/api/consistency', consistencyRoutes);
app.use('/api/day', dayRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
