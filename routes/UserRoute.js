import express from 'express';
import { getUser, getUserById, createUser, updateUser, deleteUser } from '../controllers/UserController.js';
import { verifyToken } from '../middleware/VerifyToken.js';

const router = express.Router();

router.get('/users', verifyToken, getUser);
router.get('/users/:id', verifyToken, getUserById);
router.post('/users', createUser);
router.patch('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);


export default router;