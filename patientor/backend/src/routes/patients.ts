import express from 'express';
import { z } from 'zod';
import patientService from '../services/patientService.ts';
import { toNewPatient } from '../utils.ts';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getNonSensitivePatients());
});

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

export default router;
