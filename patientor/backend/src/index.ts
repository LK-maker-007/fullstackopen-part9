import express from 'express';
import cors from 'cors';
import diagnosisRouter from './routes/diagnoses.ts';
import patientRouter from './routes/patients.ts';

const app = express();

app.use(express.json());
// the frontend is served from a different port during development
app.use(cors());

app.get('/api/ping', (_req, res) => {
  res.send('pong');
});

app.use('/api/diagnoses', diagnosisRouter);
app.use('/api/patients', patientRouter);

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
