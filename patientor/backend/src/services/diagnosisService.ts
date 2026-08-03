import diagnosisData from '../../data/diagnoses.ts';
import type { Diagnosis } from '../types.ts';

const diagnoses: Diagnosis[] = diagnosisData;

// 11
const getDiagnoses = (): Diagnosis[] => diagnoses;

export default { getDiagnoses };
