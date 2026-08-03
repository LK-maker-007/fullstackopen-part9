import { v1 as uuid } from 'uuid';
import patientData from '../../data/patients.ts';
import type { NewPatient, NonSensitivePatient, Patient } from '../types.ts';

const patients: Patient[] = patientData as Patient[];

const getPatients = (): Patient[] => patients;

// 12: the ssn is picked off before the list leaves the server
const getNonSensitivePatients = (): NonSensitivePatient[] =>
  patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));

const findById = (id: string): Patient | undefined =>
  patients.find((patient) => patient.id === id);

// 13
const addPatient = (entry: NewPatient): Patient => {
  const newPatient: Patient = { id: uuid(), ...entry };

  patients.push(newPatient);
  return newPatient;
};

export default { getPatients, getNonSensitivePatients, findById, addPatient };
