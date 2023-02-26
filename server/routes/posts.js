import express from 'express';

import { getPostsBySearch, getPost, getPosts, createPost, updatePost, likePost, commentPost, deletePost, commentDelete } from '../controllers/posts.js';

import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/search', getPostsBySearch); // get(url경로, 콜백함수(실행시키고싶은))로 구성
router.get('/', getPosts);
router.get('/:id', getPost);
router.post('/', auth, createPost);
router.patch('/:id', auth, updatePost);
router.delete('/:id', auth, deletePost);
router.patch('/:id/likePost', auth, likePost); //auth를 줘서 아무나 포스트를 작성하거나 업데이트, 삭제, 좋아요 등을 누를 수 없도록
router.post('/:id/commentPost', auth, commentPost);
router.delete('/:id/commetDelete', auth, commentDelete);
export default router;