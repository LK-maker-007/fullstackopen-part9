import { v1 as uuid } from 'uuid';
import patientData from '../../data/patients.ts';
import type {
  Entry,
  NewEntry,
  NewPatient,
  NonSensitivePatient,
  Patient
} from '../types.ts';

const patients: Patient[] = patientData;

const getPatients = (): Patient[] => patients;

// 12 and 23: the ssn and the entries are picked off before the list leaves
const getNonSensitivePatients = (): NonSensitivePatient[] =>
  patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));

// 23: one patient, entries included
const findById = (id: string): Patient | undefined =>
  patients.find((patient) => patient.id === id);

// 13
const addPatient = (entry: NewPatient): Patient => {
  const newPatient: Patient = { id: uuid(), ...entry, entries: [] };

  patients.push(newPatient);
  return newPatient;
};

// 29
const addEntry = (patientId: string, entry: NewEntry): Entry | undefined => {
  const patient = findById(patientId);

  if (!patient) {
    return undefined;
  }

  const newEntry: Entry = { id: uuid(), ...entry };
  patient.entries.push(newEntry);

  return newEntry;
};

export default {
  getPatients,
  getNonSensitivePatients,
  findById,
  addPatient,
  addEntry
};
