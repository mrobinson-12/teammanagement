import express from 'express';
import {
  getAllUsers,
  getUserById,
  updateProfile,
  getLeaderboard,
  awardPoints
} from '../controllers/user.controller';
import { authenticateToken, requireRole } from '../middleware/auth.middleware';

const router = express.Router();

// All user routes require authentication
router.use(authenticateToken);

router.get('/', getAllUsers);
router.get('/leaderboard', getLeaderboard);
router.get('/:id', getUserById);
router.patch('/profile', updateProfile);
router.post('/award-points', requireRole(['mentor']), awardPoints);

export default router;
