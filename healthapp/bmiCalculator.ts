import { isNotNumber } from './utils.ts';

interface BmiValues {
  height: number;
  weight: number;
}

const parseBmiArguments = (args: string[]): BmiValues => {
  if (args.length < 4) throw new Error('not enough arguments');
  if (args.length > 4) throw new Error('too many arguments');

  if (isNotNumber(args[2]) || isNotNumber(args[3])) {
    throw new Error('provided values were not numbers!');
  }

  return {
    height: Number(args[2]),
    weight: Number(args[3])
  };
};

// the categories come from the BMI table on Wikipedia
export const calculateBmi = (height: number, weight: number): string => {
  if (height <= 0) {
    throw new Error('height must be a positive number');
  }

  const heightInMetres = height / 100;
  const bmi = weight / (heightInMetres * heightInMetres);

  if (bmi < 18.5) return 'Underweight';
  if (bmi < 25) return 'Normal range';
  if (bmi < 30) return 'Overweight';
  return 'Obese';
};

// only parse the command line when the file is run directly, not when index.ts
// imports the calculator
if (process.argv[1] === import.meta.filename) {
  try {
    const { height, weight } = parseBmiArguments(process.argv);
    console.log(calculateBmi(height, weight));
  } catch (error: unknown) {
    let message = 'Something bad happened.';
    if (error instanceof Error) {
      message += ' Error: ' + error.message;
    }
    console.log(message);
  }
}
