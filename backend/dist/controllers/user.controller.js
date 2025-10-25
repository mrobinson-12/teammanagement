"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.awardPoints = exports.getLeaderboard = exports.updateProfile = exports.getUserById = exports.getAllUsers = void 0;
const User_model_1 = __importDefault(require("../models/User.model"));
const getAllUsers = async (req, res) => {
    try {
        const users = await User_model_1.default.find().select('-password').sort({ lastName: 1, firstName: 1 });
        res.status(200).json({ users });
    }
    catch (error) {
        console.error('Get users error:', error);
        res.status(500).json({ message: 'Error fetching users' });
    }
};
exports.getAllUsers = getAllUsers;
const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User_model_1.default.findById(id).select('-password');
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        res.status(200).json({ user });
    }
    catch (error) {
        console.error('Get user error:', error);
        res.status(500).json({ message: 'Error fetching user' });
    }
};
exports.getUserById = getUserById;
const updateProfile = async (req, res) => {
    try {
        const { firstName, lastName, avatar, skillTags, meetingPreferences } = req.body;
        const updateData = {};
        if (firstName)
            updateData.firstName = firstName;
        if (lastName)
            updateData.lastName = lastName;
        if (avatar !== undefined)
            updateData.avatar = avatar;
        if (skillTags)
            updateData.skillTags = skillTags;
        if (meetingPreferences)
            updateData.meetingPreferences = meetingPreferences;
        const user = await User_model_1.default.findByIdAndUpdate(req.userId, { $set: updateData }, { new: true, runValidators: true }).select('-password');
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        res.status(200).json({ message: 'Profile updated successfully', user });
    }
    catch (error) {
        console.error('Update profile error:', error);
        res.status(500).json({ message: 'Error updating profile' });
    }
};
exports.updateProfile = updateProfile;
const getLeaderboard = async (req, res) => {
    try {
        const users = await User_model_1.default.find()
            .select('-password')
            .sort({ points: -1 })
            .limit(10);
        res.status(200).json({ leaderboard: users });
    }
    catch (error) {
        console.error('Get leaderboard error:', error);
        res.status(500).json({ message: 'Error fetching leaderboard' });
    }
};
exports.getLeaderboard = getLeaderboard;
const awardPoints = async (req, res) => {
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
        const updateData = { $inc: { points } };
        if (badge) {
            updateData.$addToSet = { badges: badge };
        }
        const user = await User_model_1.default.findByIdAndUpdate(userId, updateData, { new: true }).select('-password');
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        res.status(200).json({
            message: 'Points awarded successfully',
            user
        });
    }
    catch (error) {
        console.error('Award points error:', error);
        res.status(500).json({ message: 'Error awarding points' });
    }
};
exports.awardPoints = awardPoints;
