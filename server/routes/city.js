import { Router } from 'express';
import {
  addCity,
  getAllCities,
  getCityById,
  removeCity,
  updateCity,
} from '../controllers/city.js';

const router = Router();
//http://localhost:3002/api/cities

router.post('/', addCity);
router.put('/:id', updateCity);
router.get('/', getAllCities);
router.get('/:id', getCityById);
router.delete('/:id', removeCity);

export default router;
