import { Request, Response } from 'express';
import Doctor from '../models/Doctor';

export const getDoctors = async (req: Request, res: Response): Promise<void> => {
  try {
    const doctors = await Doctor.find();
    res.status(200).json(doctors);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getDoctorById = async (req: Request, res: Response): Promise<void> => {
  try {
    const doctorId = req.params.id;
    const doctor = await Doctor.findById(doctorId);
    res.status(200).json(doctor);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const createDoctor = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, description, specialization, clinicLocation, image, nationalIdImage, appointmentFees } = req.body;

    const newDoctor = new Doctor({
      name,
      description,
      specialization,
      clinicLocation,
      image,
      nationalIdImage,
      appointmentFees,
    });

    await newDoctor.save();

    res.status(201).json({ message: 'Doctor created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const updateDoctor = async (req: Request, res: Response): Promise<void> => {
  try {
    const doctorId = req.params.id;
    const updateData = req.body;

    const updatedDoctor = await Doctor.findByIdAndUpdate(doctorId, updateData, { new: true });

    if (!updatedDoctor) {
      res.status(404).json({ message: 'Doctor not found' });
      return;
    }

    res.status(200).json({ message: 'Doctor updated successfully', updatedDoctor });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const deleteDoctor = async (req: Request, res: Response): Promise<void> => {
  try {
    const doctorId = req.params.id;

    const deletedDoctor = await Doctor.findByIdAndDelete(doctorId);

    if (!deletedDoctor) {
      res.status(404).json({ message: 'Doctor not found' });
      return;
    }

    res.status(200).json({ message: 'Doctor deleted successfully', deletedDoctor });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
