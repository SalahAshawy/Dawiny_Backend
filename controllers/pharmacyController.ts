import { Request, Response } from 'express';
import Pharmacy from '../models/Pharmacy';
import geolib from 'geolib';

export const getNearestPharmacies = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userLatitude, userLongitude } = req.query;

    if (!userLatitude || !userLongitude) {
      res.status(400).json({ message: 'User coordinates are required.' });
      return;
    }

    // Convert user coordinates to numbers
    const userCoords = {
      latitude: parseFloat(userLatitude as string),
      longitude: parseFloat(userLongitude as string),
    };

    // Fetch all pharmacies from the database
    const allPharmacies = await Pharmacy.find();

    // Calculate distances and sort pharmacies by distance
    const pharmaciesWithDistances = allPharmacies.map((pharmacy) => {
      const pharmacyCoords = {
        latitude: parseFloat(pharmacy.location.split(',')[0]),
        longitude: parseFloat(pharmacy.location.split(',')[1]),
      };
      const distance = geolib.getDistance(userCoords, pharmacyCoords);
      return { ...pharmacy.toObject(), distance };
    });

    // Sort pharmacies by distance and get the nearest 10
    const nearestPharmacies = pharmaciesWithDistances.sort((a, b) => a.distance - b.distance).slice(0, 10);

    res.status(200).json(nearestPharmacies);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getPharmacies = async (req: Request, res: Response): Promise<void> => {
  try {
    const pharmacies = await Pharmacy.find();
    res.status(200).json(pharmacies);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getPharmacyById = async (req: Request, res: Response): Promise<void> => {
    try {
      const pharmacyId = req.params.id;
      const pharmacy = await Pharmacy.findById(pharmacyId);
      res.status(200).json(pharmacy);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  export const createPharmacy = async (req: Request, res: Response): Promise<void> => {
    try {
      const { name, description, location, image } = req.body;
  
      const newPharmacy = new Pharmacy({
        name,
        description,
        location,
        image,
      });
  
      await newPharmacy.save();
  
      res.status(201).json({ message: 'Pharmacy created successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  export const updatePharmacy = async (req: Request, res: Response): Promise<void> => {
    try {
      const pharmacyId = req.params.id;
      const updateData = req.body;
  
      const updatedPharmacy = await Pharmacy.findByIdAndUpdate(pharmacyId, updateData, { new: true });
  
      if (!updatedPharmacy) {
        res.status(404).json({ message: 'Pharmacy not found' });
        return;
      }
  
      res.status(200).json({ message: 'Pharmacy updated successfully', updatedPharmacy });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  export const deletePharmacy = async (req: Request, res: Response): Promise<void> => {
    try {
      const pharmacyId = req.params.id;
  
      const deletedPharmacy = await Pharmacy.findByIdAndDelete(pharmacyId);
  
      if (!deletedPharmacy) {
        res.status(404).json({ message: 'Pharmacy not found' });
        return;
      }
  
      res.status(200).json({ message: 'Pharmacy deleted successfully', deletedPharmacy });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }

};
