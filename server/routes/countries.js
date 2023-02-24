import { Router } from 'express';
import {
  addCountry,
  getAllCountries,
  getCountryById,
  removeCountry,
  updateCountry,
} from '../controllers/countries.js';

const router = Router();
//http://localhost:3002/api/countries

router.post('/', addCountry);
router.put('/:id', updateCountry);
router.get('/', getAllCountries);
router.get('/:id', getCountryById);
router.delete('/:id', removeCountry);

export default router;
