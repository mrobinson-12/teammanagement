import express from 'express';
import {
  createMeeting,
  getMeetings,
  getMeetingById,
  updateMeeting,
  deleteMeeting,
  rsvpMeeting
} from '../controllers/meeting.controller';
import { authenticateToken } from '../middleware/auth.middleware';

const router = express.Router();

// All meeting routes require authentication
router.use(authenticateToken);

router.post('/', createMeeting);
router.get('/', getMeetings);
router.get('/:id', getMeetingById);
router.patch('/:id', updateMeeting);
router.delete('/:id', deleteMeeting);
router.post('/:id/rsvp', rsvpMeeting);

export default router;
