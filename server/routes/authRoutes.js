import express from'express'
import { loginUser, myProfile, registerUser, updateProfile } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const router =express.Router()
router.post('/', registerUser) 
router.post('/login', loginUser) 
router.get('/profile',protect, myProfile) 
router.put('/profile',protect, updateProfile) 

export default router;