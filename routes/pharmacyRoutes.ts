import express from 'express';
import {
  getPharmacies,
  getPharmacyById,
  createPharmacy,
  updatePharmacy,
  deletePharmacy,
} from '../controllers/pharmacyController';

const router = express.Router();

router.get('/', getPharmacies);
router.get('/:id', getPharmacyById);
router.post('/', createPharmacy);
router.put('/:id', updatePharmacy);
router.delete('/:id', deletePharmacy);

export default router;
