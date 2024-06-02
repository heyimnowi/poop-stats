import express from 'express';
import dataRoutes from './routes/frequencyRoutes';
import timeRoutes from './routes/timeRoutes';
import consistencyRoutes from './routes/consistencyRoutes';

const app = express();
const PORT = 3000;

app.use('/api', dataRoutes);
app.use('/api/time', timeRoutes);
app.use('/api/consistency', consistencyRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
