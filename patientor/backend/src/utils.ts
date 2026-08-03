import { z } from 'zod';
import { Gender } from './types.ts';
import type { NewPatient } from './types.ts';

// 15: Zod does the validating and the narrowing in one step
export const NewPatientSchema = z.object({
  name: z.string(),
  dateOfBirth: z.iso.date(),
  ssn: z.string(),
  gender: z.enum(Gender),
  occupation: z.string()
});

export const toNewPatient = (object: unknown): NewPatient =>
  NewPatientSchema.parse(object);
