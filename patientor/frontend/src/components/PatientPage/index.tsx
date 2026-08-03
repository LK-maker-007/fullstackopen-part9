import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Alert, Button, Typography } from '@mui/material';
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import TransgenderIcon from '@mui/icons-material/Transgender';
import patientService from '../../services/patients';
import diagnosisService from '../../services/diagnoses';
import { Gender } from '../../types';
import type { Diagnosis, NewEntry, Patient } from '../../types';
import AddEntryForm from './AddEntryForm';
import EntryDetails from './EntryDetails';

const genderIcon = (gender: Gender) => {
  switch (gender) {
    case Gender.Male:
      return <MaleIcon />;
    case Gender.Female:
      return <FemaleIcon />;
    default:
      return <TransgenderIcon />;
  }
};

// 24, 26, 27 and 28
const PatientPage = () => {
  const id = useParams<{ id: string }>().id;
  const [patient, setPatient] = useState<Patient | null>(null);
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [formVisible, setFormVisible] = useState(false);

  useEffect(() => {
    if (!id) {
      return;
    }

    void patientService.getById(id).then((data) => setPatient(data));
    void diagnosisService.getAll().then((data) => setDiagnoses(data));
  }, [id]);

  if (!patient) {
    return null;
  }

  // 30: a rejected entry has to explain itself
  const submitEntry = async (entry: NewEntry) => {
    try {
      const added = await patientService.createEntry(patient.id, entry);
      setPatient({ ...patient, entries: patient.entries.concat(added) });
      setFormVisible(false);
      setError(null);
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        const data: unknown = e.response?.data;

        if (
          data &&
          typeof data === 'object' &&
          'error' in data &&
          Array.isArray(data.error)
        ) {
          setError(
            data.error
              .map((issue: unknown) =>
                issue && typeof issue === 'object' && 'message' in issue
                  ? String(issue.message)
                  : String(issue)
              )
              .join(', ')
          );
        } else {
          setError(e.message);
        }
      } else {
        setError('Unknown error');
      }
    }
  };

  return (
    <div>
      <Typography variant="h5" sx={{ my: 2 }}>
        {patient.name} {genderIcon(patient.gender)}
      </Typography>

      <Typography variant="body1">ssn: {patient.ssn}</Typography>
      <Typography variant="body1">occupation: {patient.occupation}</Typography>

      {error && (
        <Alert severity="error" sx={{ my: 2 }}>
          {error}
        </Alert>
      )}

      {formVisible ? (
        <AddEntryForm
          diagnoses={diagnoses}
          onSubmit={(entry) => void submitEntry(entry)}
          onCancel={() => setFormVisible(false)}
        />
      ) : (
        <Button
          variant="contained"
          sx={{ my: 2 }}
          onClick={() => setFormVisible(true)}
        >
          Add New Entry
        </Button>
      )}

      <Typography variant="h6" sx={{ mt: 2 }}>
        entries
      </Typography>

      {patient.entries.map((entry) => (
        <EntryDetails key={entry.id} entry={entry} diagnoses={diagnoses} />
      ))}
    </div>
  );
};

export default PatientPage;
