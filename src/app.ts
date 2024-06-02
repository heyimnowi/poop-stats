import express from 'express';
import dataRoutes from './routes/dataRoutes';

const app = express();
const PORT = 3000;

app.use('/api', dataRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
