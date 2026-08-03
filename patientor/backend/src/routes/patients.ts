import express from 'express';
import { z } from 'zod';
import patientService from '../services/patientService.ts';
import { toNewEntry, toNewPatient } from '../utils.ts';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getNonSensitivePatients());
});

// 23: one patient with the entries included
router.get('/:id', (req, res) => {
  const patient = patientService.findById(req.params.id);

  if (patient) {
    res.send(patient);
  } else {
    res.sendStatus(404);
  }
});

// 13, 14 and 15: the body is parsed before it is trusted
router.post('/', (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);
    res.send(patientService.addPatient(newPatient));
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      res.status(400).send({ error: error.issues });
    } else {
      res.status(400).send({ error: 'unknown error' });
    }
  }
});

// 29
router.post('/:id/entries', (req, res) => {
  try {
    const newEntry = toNewEntry(req.body);
    const added = patientService.addEntry(req.params.id, newEntry);

    if (!added) {
      res.sendStatus(404);
      return;
    }

    res.send(added);
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      res.status(400).send({ error: error.issues });
    } else {
      res.status(400).send({ error: 'unknown error' });
    }
  }
});

export default router;
