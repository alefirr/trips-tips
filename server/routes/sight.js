import { Router } from 'express';
import {
  addSight,
  updateSight,
  getAllSights,
  getSightById,
  removeSight,
} from '../controllers/sight.js';

const router = Router();
//http://localhost:3002/api/sights
router.post('/', addSight);
router.put('/:id', updateSight);
router.get('/', getAllSights);
router.get('/:id', getSightById);
router.delete('/:id', removeSight);

export default router;
