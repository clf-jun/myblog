import express from 'express';
import { signin, signup } from '../controllers/user.js';

import {  } from '../controllers/posts.js';

const router = express.Router();

router.post('/signin', signin); //해당 폼들을 backend 서버로 보내기 위해 post route를 쓴다.
router.post('/signup', signup); //해당 폼들을 backend 서버로 보내기 위해 post route를 쓴다.

export default router;