import { Router } from 'express';
import { createPost, getPagination, getPostById, increaseView } from '../controllers/post.controller.js';

const router = Router();

router.get('/', getPagination);
router.get('/id/:id', getPostById);
router.post('/', createPost);
router.put('/increase-view/:id', increaseView);

export default router;
