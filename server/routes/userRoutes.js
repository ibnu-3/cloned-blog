import express from'express'
import { getUser, getUsers } from '../controllers/userController.js';
import { admin, protect } from '../middleware/authMiddleware.js';

const router = express.Router()

router.get('/', protect, admin, getUsers)
router.get('/:id', protect, getUser)

export default router;
