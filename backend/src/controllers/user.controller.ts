import { Response } from 'express';
import { AuthRequest } from '../middleware/auth.middleware';
import User from '../models/User.model';

export const getAllUsers = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const users = await User.find().select('-password').sort({ lastName: 1, firstName: 1 });
    res.status(200).json({ users });
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({ message: 'Error fetching users' });
  }
};

export const getUserById = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).select('-password');

    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ message: 'Error fetching user' });
  }
};

export const updateProfile = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { firstName, lastName, avatar, skillTags, meetingPreferences } = req.body;

    const updateData: any = {};
    if (firstName) updateData.firstName = firstName;
    if (lastName) updateData.lastName = lastName;
    if (avatar !== undefined) updateData.avatar = avatar;
    if (skillTags) updateData.skillTags = skillTags;
    if (meetingPreferences) updateData.meetingPreferences = meetingPreferences;

    const user = await User.findByIdAndUpdate(
      req.userId,
      { $set: updateData },
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    res.status(200).json({ message: 'Profile updated successfully', user });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ message: 'Error updating profile' });
  }
};

export const getLeaderboard = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const users = await User.find()
      .select('-password')
      .sort({ points: -1 })
      .limit(10);

    res.status(200).json({ leaderboard: users });
  } catch (error) {
    console.error('Get leaderboard error:', error);
    res.status(500).json({ message: 'Error fetching leaderboard' });
  }
};

export const awardPoints = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    // Only mentors can award points
    if (req.userRole !== 'mentor') {
      res.status(403).json({ message: 'Only mentors can award points' });
      return;
    }

    const { userId, points, badge } = req.body;

    if (!userId || !points) {
      res.status(400).json({ message: 'User ID and points are required' });
      return;
    }

    const updateData: any = { $inc: { points } };
    if (badge) {
      updateData.$addToSet = { badges: badge };
    }

    const user = await User.findByIdAndUpdate(
      userId,
      updateData,
      { new: true }
    ).select('-password');

    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    res.status(200).json({ 
      message: 'Points awarded successfully', 
      user 
    });
  } catch (error) {
    console.error('Award points error:', error);
    res.status(500).json({ message: 'Error awarding points' });
  }
};
