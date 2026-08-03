import { useState } from 'react';
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Typography
} from '@mui/material';
import type { SelectChangeEvent } from '@mui/material';
import { HealthCheckRating } from '../../types';
import type { Diagnosis, NewEntry } from '../../types';

interface AddEntryFormProps {
  diagnoses: Diagnosis[];
  onSubmit: (entry: NewEntry) => void;
  onCancel: () => void;
}

type EntryType = 'HealthCheck' | 'Hospital' | 'OccupationalHealthcare';

// 30, 31 and 32: every entry type, with pickers rather than free text where it matters
const AddEntryForm = ({ diagnoses, onSubmit, onCancel }: AddEntryFormProps) => {
  const [type, setType] = useState<EntryType>('HealthCheck');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);

  const [healthCheckRating, setHealthCheckRating] = useState<HealthCheckRating>(
    HealthCheckRating.Healthy
  );
  const [dischargeDate, setDischargeDate] = useState('');
  const [dischargeCriteria, setDischargeCriteria] = useState('');
  const [employerName, setEmployerName] = useState('');
  const [sickLeaveStart, setSickLeaveStart] = useState('');
  const [sickLeaveEnd, setSickLeaveEnd] = useState('');

  const onCodesChange = (event: SelectChangeEvent<string[]>) => {
    const value = event.target.value;
    setDiagnosisCodes(typeof value === 'string' ? value.split(',') : value);
  };

  const addEntry = (event: React.SyntheticEvent) => {
    event.preventDefault();

    const base = {
      description,
      date,
      specialist,
      ...(diagnosisCodes.length > 0 ? { diagnosisCodes } : {})
    };

    switch (type) {
      case 'HealthCheck':
        onSubmit({ ...base, type: 'HealthCheck', healthCheckRating });
        break;
      case 'Hospital':
        onSubmit({
          ...base,
          type: 'Hospital',
          discharge: { date: dischargeDate, criteria: dischargeCriteria }
        });
        break;
      case 'OccupationalHealthcare':
        onSubmit({
          ...base,
          type: 'OccupationalHealthcare',
          employerName,
          ...(sickLeaveStart && sickLeaveEnd
            ? { sickLeave: { startDate: sickLeaveStart, endDate: sickLeaveEnd } }
            : {})
        });
        break;
    }
  };

  return (
    <Box sx={{ border: 1, borderStyle: 'dashed', borderRadius: 2, p: 2, my: 2 }}>
      <Typography variant="h6">New entry</Typography>

      <form onSubmit={addEntry}>
        <FormControl fullWidth margin="dense">
          <InputLabel id="entry-type-label">Type</InputLabel>
          <Select
            labelId="entry-type-label"
            label="Type"
            value={type}
            onChange={({ target }) => setType(target.value as EntryType)}
          >
            <MenuItem value="HealthCheck">HealthCheck</MenuItem>
            <MenuItem value="Hospital">Hospital</MenuItem>
            <MenuItem value="OccupationalHealthcare">
              OccupationalHealthcare
            </MenuItem>
          </Select>
        </FormControl>

        <TextField
          label="Description"
          fullWidth
          margin="dense"
          value={description}
          onChange={({ target }) => setDescription(target.value)}
        />

        {/* 32: a real date picker instead of free text */}
        <TextField
          label="Date"
          type="date"
          fullWidth
          margin="dense"
          slotProps={{ inputLabel: { shrink: true } }}
          value={date}
          onChange={({ target }) => setDate(target.value)}
        />

        <TextField
          label="Specialist"
          fullWidth
          margin="dense"
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
        />

        {/* 32: the codes come from the ones the server knows about */}
        <FormControl fullWidth margin="dense">
          <InputLabel id="codes-label">Diagnosis codes</InputLabel>
          <Select
            labelId="codes-label"
            multiple
            value={diagnosisCodes}
            onChange={onCodesChange}
            input={<OutlinedInput label="Diagnosis codes" />}
            renderValue={(selected) => selected.join(', ')}
          >
            {diagnoses.map((diagnosis) => (
              <MenuItem key={diagnosis.code} value={diagnosis.code}>
                <Checkbox checked={diagnosisCodes.includes(diagnosis.code)} />
                <ListItemText primary={`${diagnosis.code} ${diagnosis.name}`} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {type === 'HealthCheck' && (
          <FormControl fullWidth margin="dense">
            <InputLabel id="rating-label">Healthcheck rating</InputLabel>
            <Select
              labelId="rating-label"
              label="Healthcheck rating"
              value={String(healthCheckRating)}
              onChange={({ target }) =>
                setHealthCheckRating(Number(target.value) as HealthCheckRating)
              }
            >
              <MenuItem value="0">Healthy</MenuItem>
              <MenuItem value="1">Low risk</MenuItem>
              <MenuItem value="2">High risk</MenuItem>
              <MenuItem value="3">Critical risk</MenuItem>
            </Select>
          </FormControl>
        )}

        {type === 'Hospital' && (
          <>
            <TextField
              label="Discharge date"
              type="date"
              fullWidth
              margin="dense"
              slotProps={{ inputLabel: { shrink: true } }}
              value={dischargeDate}
              onChange={({ target }) => setDischargeDate(target.value)}
            />
            <TextField
              label="Discharge criteria"
              fullWidth
              margin="dense"
              value={dischargeCriteria}
              onChange={({ target }) => setDischargeCriteria(target.value)}
            />
          </>
        )}

        {type === 'OccupationalHealthcare' && (
          <>
            <TextField
              label="Employer name"
              fullWidth
              margin="dense"
              value={employerName}
              onChange={({ target }) => setEmployerName(target.value)}
            />
            <TextField
              label="Sick leave start"
              type="date"
              fullWidth
              margin="dense"
              slotProps={{ inputLabel: { shrink: true } }}
              value={sickLeaveStart}
              onChange={({ target }) => setSickLeaveStart(target.value)}
            />
            <TextField
              label="Sick leave end"
              type="date"
              fullWidth
              margin="dense"
              slotProps={{ inputLabel: { shrink: true } }}
              value={sickLeaveEnd}
              onChange={({ target }) => setSickLeaveEnd(target.value)}
            />
          </>
        )}

        <Box sx={{ mt: 2 }}>
          <Button color="secondary" variant="contained" onClick={onCancel}>
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            sx={{ float: 'right' }}
          >
            Add
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default AddEntryForm;
