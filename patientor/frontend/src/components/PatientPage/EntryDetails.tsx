import { Box, Typography } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import WorkIcon from '@mui/icons-material/Work';
import type { Diagnosis, Entry } from '../../types';

interface EntryDetailsProps {
  entry: Entry;
  diagnoses: Diagnosis[];
}

// a value that should never be reached tells the compiler the switch is complete
const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const ratingColour = ['green', 'gold', 'orange', 'red'];

const EntryDetails = ({ entry, diagnoses }: EntryDetailsProps) => {
  const codes = entry.diagnosisCodes ?? [];

  const common = (
    <>
      <Typography variant="body2">{entry.date}</Typography>
      <Typography variant="body1">
        <em>{entry.description}</em>
      </Typography>
      {codes.length > 0 && (
        <ul>
          {codes.map((code) => {
            const diagnosis = diagnoses.find((d) => d.code === code);
            return (
              <li key={code}>
                {code} {diagnosis ? diagnosis.name : ''}
              </li>
            );
          })}
        </ul>
      )}
      <Typography variant="body2">diagnosed by {entry.specialist}</Typography>
    </>
  );

  const frame = (icon: React.ReactNode, extra?: React.ReactNode) => (
    <Box
      sx={{ border: 1, borderRadius: 2, p: 2, my: 1 }}
      className="entry"
    >
      <Typography variant="body2">
        {entry.date} {icon}
      </Typography>
      {common}
      {extra}
    </Box>
  );

  // 28: an exhaustive switch, so a new kind of entry cannot be forgotten
  switch (entry.type) {
    case 'Hospital':
      return frame(
        <LocalHospitalIcon />,
        <Typography variant="body2">
          discharged {entry.discharge.date}: {entry.discharge.criteria}
        </Typography>
      );
    case 'OccupationalHealthcare':
      return frame(
        <>
          <WorkIcon /> {entry.employerName}
        </>,
        entry.sickLeave && (
          <Typography variant="body2">
            sick leave {entry.sickLeave.startDate} - {entry.sickLeave.endDate}
          </Typography>
        )
      );
    case 'HealthCheck':
      return frame(
        <MedicalServicesIcon />,
        <FavoriteIcon sx={{ color: ratingColour[entry.healthCheckRating] }} />
      );
    default:
      return assertNever(entry);
  }
};

export default EntryDetails;
