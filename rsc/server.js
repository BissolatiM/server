const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
app.use(express.json());
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const Patient = mongoose.model('Patient', new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  dateOfBirth: Date,
}));

const Appointment = mongoose.model('Appointment', new mongoose.Schema({
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient' },
  date: Date,
  reason: String,
}));

app.get('/patients', async (req, res) => {
  const patients = await Patient.find();
  res.json(patients);
});

app.post('/patients', async (req, res) => {
  const newPatient = new Patient(req.body);
  await newPatient.save();
  res.status(201).json(newPatient);
});

app.get('/appointments', async (req, res) => {
  const appointments = await Appointment.find().populate('patientId');
  res.json(appointments);
});

app.post('/appointments', async (req, res) => {
  const newAppointment = new Appointment(req.body);
  await newAppointment.save();
  res.status(201).json(newAppointment);
});

app.listen(process.env.PORT || 5000, () => {
  console.log('Server is running...');
});