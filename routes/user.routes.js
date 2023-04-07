import { Router } from 'express';
import { createUser, getUserByEmail } from '../controllers/user.controller.js';

const router = Router();

router.get('/:email', getUserByEmail);
router.post('/', createUser);

export default router;
