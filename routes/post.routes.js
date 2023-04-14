import { Router } from 'express';
import { createPost, getPagination, getPostById, increaseView } from '../controllers/post.controller.js';
import { lovedHandle, unlovedHandle } from '../controllers/favorite.controller.js';

const router = Router();

router.get('/', getPagination);
router.get('/id/:id', getPostById);

router.post('/', createPost);
router.post('/loved', lovedHandle);
router.post('/unloved', unlovedHandle);

router.put('/increase-view/:id', increaseView);

export default router;
