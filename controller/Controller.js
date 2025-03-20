import express from 'express';
import { saveStaff, getAllStaff, updateStaff, deleteStaff } from './staffPageModel.js';

const router = express.Router();

router.get('/staff/all', (req, res) => {
  res.json(getAllStaff());
});

router.post('/staff', (req, res) => {
  const newStaff = req.body;
  saveStaff(newStaff);
  res.status(201).json(newStaff);
});

router.put('/staff/:index', (req, res) => {
  const index = req.params.index;
  const updatedStaff = req.body;
  updateStaff(index, updatedStaff);
  res.json(updatedStaff);
});

router.delete('/staff/:index', (req, res) => {
  const index = req.params.index;
  deleteStaff(index);
  res.status(204).send();
});

export default router;