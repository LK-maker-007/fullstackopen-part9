import express from 'express';
import { calculateBmi } from './bmiCalculator.ts';
import { calculateExercises } from './exerciseCalculator.ts';
import { isNotNumber } from './utils.ts';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const { height, weight } = req.query;

  if (
    height === undefined ||
    weight === undefined ||
    isNotNumber(height) ||
    isNotNumber(weight)
  ) {
    res.status(400).json({ error: 'malformatted parameters' });
    return;
  }

  const heightValue = Number(height);
  const weightValue = Number(weight);

  res.json({
    weight: weightValue,
    height: heightValue,
    bmi: calculateBmi(heightValue, weightValue)
  });
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;

  if (daily_exercises === undefined || target === undefined) {
    res.status(400).json({ error: 'parameters missing' });
    return;
  }

  if (
    !Array.isArray(daily_exercises) ||
    daily_exercises.length === 0 ||
    isNotNumber(target) ||
    daily_exercises.some(isNotNumber)
  ) {
    res.status(400).json({ error: 'malformatted parameters' });
    return;
  }

  const dailyHours = daily_exercises.map(Number);

  res.json(calculateExercises(dailyHours, Number(target)));
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
