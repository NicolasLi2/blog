import { Router } from 'express';
import { test, updateUser } from '../controllers/user.controller';
import { verifyToken } from '../utils/verifyUser';

const router = Router();

router.get('/', test);
router.put('/update/:userId', verifyToken, updateUser);

export default router;
