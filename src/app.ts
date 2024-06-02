import express from 'express';
import bodyParser from 'body-parser';
import logRoutes from './routes/logRoutes';

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.use('/logs', logRoutes);

app.listen(port, () => {
  console.log(`API running at http://localhost:${port}`);
});
