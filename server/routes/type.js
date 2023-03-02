import { Router } from 'express';
import { getAllTypes } from '../controllers/type.js';

const router = Router();

router.get('/', getAllTypes);

export default router;
