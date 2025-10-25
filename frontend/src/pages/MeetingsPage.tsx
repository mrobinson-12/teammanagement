import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { motion } from 'framer-motion';

interface Meeting {
  _id: string;
  title: string;
  description: string;
  date: string;
  duration: number;
  location: string;
  isRecurring: boolean;
  rsvps: any[];
  createdBy: any;
}

const MeetingsPage: React.FC = () => {
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [newMeeting, setNewMeeting] = useState({
    title: '',
    description: '',
    date: '',
    duration: 60,
    location: ''
  });

  useEffect(() => {
    fetchMeetings();
  }, []);

  const fetchMeetings = async () => {
    try {
      const response = await api.get('/meetings');
      setMeetings(response.data.meetings || []);
    } catch (error) {
      console.error('Error fetching meetings:', error);
    } finally {
      setLoading(false);
    }
  };

  const createMeeting = async () => {
    try {
      await api.post('/meetings', newMeeting);
      setShowModal(false);
      setNewMeeting({ title: '', description: '', date: '', duration: 60, location: '' });
      fetchMeetings();
    } catch (error) {
      console.error('Error creating meeting:', error);
    }
  };

  const handleRSVP = async (meetingId: string, status: 'yes' | 'no' | 'maybe') => {
    try {
      await api.post(`/meetings/${meetingId}/rsvp`, { status });
      fetchMeetings();
    } catch (error) {
      console.error('Error updating RSVP:', error);
    }
  };

  const deleteMeeting = async (meetingId: string) => {
    if (window.confirm('Are you sure you want to delete this meeting?')) {
      try {
        await api.delete(`/meetings/${meetingId}`);
        fetchMeetings();
      } catch (error) {
        console.error('Error deleting meeting:', error);
      }
    }
  };

  if (loading) {
    return <div className="text-center py-12">Loading meetings...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Meetings Calendar 📅</h1>
        <button
          onClick={() => setShowModal(true)}
          className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
        >
          + Schedule Meeting
        </button>
      </div>

      {/* Meetings List */}
      <div className="grid grid-cols-1 gap-4">
        {meetings.length === 0 ? (
          <div className="bg-white rounded-xl p-12 text-center shadow-lg">
            <p className="text-gray-500 text-lg">No meetings scheduled yet</p>
          </div>
        ) : (
          meetings.map((meeting, index) => {
            const meetingDate = new Date(meeting.date);
            const isUpcoming = meetingDate >= new Date();
            const yesCount = meeting.rsvps.filter(r => r.status === 'yes').length;
            const noCount = meeting.rsvps.filter(r => r.status === 'no').length;
            const maybeCount = meeting.rsvps.filter(r => r.status === 'maybe').length;

            return (
              <motion.div
                key={meeting._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`bg-white rounded-xl p-6 shadow-lg ${
                  !isUpcoming ? 'opacity-75' : ''
                }`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">
                      {meeting.title}
                      {!isUpcoming && <span className="ml-2 text-sm text-gray-500">(Past)</span>}
                    </h3>
                    <p className="text-gray-600 mb-3">{meeting.description}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                      <div className="flex items-center space-x-2">
                        <span className="text-blue-600">📅</span>
                        <span className="text-gray-700">
                          {meetingDate.toLocaleDateString()} at {meetingDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-green-600">⏱️</span>
                        <span className="text-gray-700">{meeting.duration} minutes</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-purple-600">📍</span>
                        <span className="text-gray-700">{meeting.location}</span>
                      </div>
                    </div>

                    {/* RSVP Summary */}
                    <div className="mt-4 flex items-center space-x-4 text-sm">
                      <span className="text-gray-600">RSVPs:</span>
                      <span className="bg-green-100 text-green-700 px-2 py-1 rounded">
                        ✓ {yesCount} Yes
                      </span>
                      <span className="bg-red-100 text-red-700 px-2 py-1 rounded">
                        ✗ {noCount} No
                      </span>
                      <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded">
                        ? {maybeCount} Maybe
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => deleteMeeting(meeting._id)}
                    className="ml-4 text-red-500 hover:text-red-700"
                    title="Delete meeting"
                  >
                    🗑️
                  </button>
                </div>

                {/* RSVP Buttons */}
                {isUpcoming && (
                  <div className="flex gap-2 pt-4 border-t border-gray-200">
                    <button
                      onClick={() => handleRSVP(meeting._id, 'yes')}
                      className="flex-1 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-colors"
                    >
                      ✓ Yes
                    </button>
                    <button
                      onClick={() => handleRSVP(meeting._id, 'maybe')}
                      className="flex-1 px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg font-medium transition-colors"
                    >
                      ? Maybe
                    </button>
                    <button
                      onClick={() => handleRSVP(meeting._id, 'no')}
                      className="flex-1 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-colors"
                    >
                      ✗ No
                    </button>
                  </div>
                )}
              </motion.div>
            );
          })
        )}
      </div>

      {/* Create Meeting Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl p-6 max-w-md w-full"
          >
            <h2 className="text-2xl font-bold mb-4">Schedule Meeting</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Meeting Title
                </label>
                <input
                  type="text"
                  value={newMeeting.title}
                  onChange={(e) => setNewMeeting({ ...newMeeting, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  placeholder="Team standup, Robot testing, etc."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={newMeeting.description}
                  onChange={(e) => setNewMeeting({ ...newMeeting, description: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  rows={3}
                  placeholder="Meeting agenda and objectives"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date & Time
                </label>
                <input
                  type="datetime-local"
                  value={newMeeting.date}
                  onChange={(e) => setNewMeeting({ ...newMeeting, date: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Duration (minutes)
                </label>
                <input
                  type="number"
                  value={newMeeting.duration}
                  onChange={(e) => setNewMeeting({ ...newMeeting, duration: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  min="15"
                  step="15"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <input
                  type="text"
                  value={newMeeting.location}
                  onChange={(e) => setNewMeeting({ ...newMeeting, location: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  placeholder="School lab, Zoom link, etc."
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={createMeeting}
                className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium"
              >
                Schedule
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-medium"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default MeetingsPage;
