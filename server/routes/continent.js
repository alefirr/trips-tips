import Router from 'express';
import { getAllContinents } from '../controllers/continent.js';

const router = Router();

router.get('/', getAllContinents);

export default router;
