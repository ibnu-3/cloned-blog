import express from'express'
import { getUsers } from '../controllers/userController.js';
import { admin, protect } from '../middleware/authMiddleware.js';

const router = express.Router()

router.get('/', protect, admin, getUsers)

export default router;
