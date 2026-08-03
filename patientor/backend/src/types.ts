export interface Diagnosis {
  code: string;
  name: string;
  // not every diagnosis has a latin name
  latin?: string;
}

// 14: gender as a const object based type rather than an enum
export const Gender = {
  Male: 'male',
  Female: 'female',
  Other: 'other'
} as const;

export type Gender = (typeof Gender)[keyof typeof Gender];

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
}

// 12: what the frontend is allowed to see
export type NonSensitivePatient = Omit<Patient, 'ssn'>;

export type NewPatient = Omit<Patient, 'id'>;
