"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rsvpMeeting = exports.deleteMeeting = exports.updateMeeting = exports.getMeetingById = exports.getMeetings = exports.createMeeting = void 0;
const Meeting_model_1 = __importDefault(require("../models/Meeting.model"));
const createMeeting = async (req, res) => {
    try {
        const { title, description, date, duration, location, isRecurring, recurringPattern } = req.body;
        if (!title || !description || !date || !location) {
            res.status(400).json({ message: 'Title, description, date, and location are required' });
            return;
        }
        const meeting = new Meeting_model_1.default({
            title,
            description,
            date,
            duration: duration || 60,
            location,
            isRecurring: isRecurring || false,
            recurringPattern,
            createdBy: req.userId
        });
        await meeting.save();
        await meeting.populate('createdBy', 'firstName lastName email avatar');
        res.status(201).json({ message: 'Meeting created successfully', meeting });
    }
    catch (error) {
        console.error('Create meeting error:', error);
        res.status(500).json({ message: 'Error creating meeting' });
    }
};
exports.createMeeting = createMeeting;
const getMeetings = async (req, res) => {
    try {
        const { upcoming } = req.query;
        const query = {};
        if (upcoming === 'true') {
            query.date = { $gte: new Date() };
        }
        const meetings = await Meeting_model_1.default.find(query)
            .populate('createdBy', 'firstName lastName email avatar')
            .populate('rsvps.user', 'firstName lastName email avatar')
            .sort({ date: 1 });
        res.status(200).json({ meetings });
    }
    catch (error) {
        console.error('Get meetings error:', error);
        res.status(500).json({ message: 'Error fetching meetings' });
    }
};
exports.getMeetings = getMeetings;
const getMeetingById = async (req, res) => {
    try {
        const { id } = req.params;
        const meeting = await Meeting_model_1.default.findById(id)
            .populate('createdBy', 'firstName lastName email avatar')
            .populate('rsvps.user', 'firstName lastName email avatar');
        if (!meeting) {
            res.status(404).json({ message: 'Meeting not found' });
            return;
        }
        res.status(200).json({ meeting });
    }
    catch (error) {
        console.error('Get meeting error:', error);
        res.status(500).json({ message: 'Error fetching meeting' });
    }
};
exports.getMeetingById = getMeetingById;
const updateMeeting = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;
        const meeting = await Meeting_model_1.default.findByIdAndUpdate(id, { $set: updates }, { new: true, runValidators: true })
            .populate('createdBy', 'firstName lastName email avatar')
            .populate('rsvps.user', 'firstName lastName email avatar');
        if (!meeting) {
            res.status(404).json({ message: 'Meeting not found' });
            return;
        }
        res.status(200).json({ message: 'Meeting updated successfully', meeting });
    }
    catch (error) {
        console.error('Update meeting error:', error);
        res.status(500).json({ message: 'Error updating meeting' });
    }
};
exports.updateMeeting = updateMeeting;
const deleteMeeting = async (req, res) => {
    try {
        const { id } = req.params;
        const meeting = await Meeting_model_1.default.findByIdAndDelete(id);
        if (!meeting) {
            res.status(404).json({ message: 'Meeting not found' });
            return;
        }
        res.status(200).json({ message: 'Meeting deleted successfully' });
    }
    catch (error) {
        console.error('Delete meeting error:', error);
        res.status(500).json({ message: 'Error deleting meeting' });
    }
};
exports.deleteMeeting = deleteMeeting;
const rsvpMeeting = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        if (!status || !['yes', 'no', 'maybe'].includes(status)) {
            res.status(400).json({ message: 'Valid RSVP status is required (yes, no, maybe)' });
            return;
        }
        const meeting = await Meeting_model_1.default.findById(id);
        if (!meeting) {
            res.status(404).json({ message: 'Meeting not found' });
            return;
        }
        // Remove existing RSVP from this user
        meeting.rsvps = meeting.rsvps.filter((rsvp) => rsvp.user.toString() !== req.userId);
        // Add new RSVP
        meeting.rsvps.push({
            user: req.userId,
            status,
            respondedAt: new Date()
        });
        await meeting.save();
        await meeting.populate('rsvps.user', 'firstName lastName email avatar');
        res.status(200).json({ message: 'RSVP updated successfully', meeting });
    }
    catch (error) {
        console.error('RSVP meeting error:', error);
        res.status(500).json({ message: 'Error updating RSVP' });
    }
};
exports.rsvpMeeting = rsvpMeeting;
