import { Router } from 'express';
import { register, login } from '../controllers/auth.js';
const router = Router();

//http://localhost:3002

// POST /api/auth/register
router.post('/register', register);

// POST /api/auth/login
router.post('/login', login);

export default router;
