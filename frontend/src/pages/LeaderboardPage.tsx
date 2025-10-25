import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { motion } from 'framer-motion';

interface LeaderboardUser {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  points: number;
  badges: string[];
  role: string;
}

const LeaderboardPage: React.FC = () => {
  const [leaderboard, setLeaderboard] = useState<LeaderboardUser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      const response = await api.get('/users/leaderboard');
      setLeaderboard(response.data.leaderboard || []);
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const getMedalEmoji = (index: number) => {
    switch (index) {
      case 0: return '🥇';
      case 1: return '🥈';
      case 2: return '🥉';
      default: return `#${index + 1}`;
    }
  };

  const getRankColor = (index: number) => {
    switch (index) {
      case 0: return 'from-yellow-400 to-yellow-600';
      case 1: return 'from-gray-300 to-gray-500';
      case 2: return 'from-orange-400 to-orange-600';
      default: return 'from-blue-400 to-blue-600';
    }
  };

  if (loading) {
    return <div className="text-center py-12">Loading leaderboard...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">🏆 Team Leaderboard</h1>
        <p className="text-gray-600">Top performers recognized for their contributions</p>
      </div>

      {/* Leaderboard */}
      <div className="space-y-4">
        {leaderboard.length === 0 ? (
          <div className="bg-white rounded-xl p-12 text-center shadow-lg">
            <p className="text-gray-500 text-lg">No team members yet</p>
          </div>
        ) : (
          leaderboard.map((user, index) => (
            <motion.div
              key={user._id}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`bg-white rounded-xl shadow-lg overflow-hidden ${
                index < 3 ? 'border-2 border-yellow-400' : ''
              }`}
            >
              <div className="flex items-center p-6">
                {/* Rank */}
                <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${getRankColor(index)} flex items-center justify-center text-white font-bold text-xl mr-6`}>
                  {getMedalEmoji(index)}
                </div>

                {/* User Info */}
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-xl font-bold text-gray-800">
                      {user.firstName} {user.lastName}
                    </h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      user.role === 'mentor' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
                    }`}>
                      {user.role}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm">{user.email}</p>
                  
                  {/* Badges */}
                  {user.badges && user.badges.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {user.badges.slice(0, 5).map((badge, badgeIndex) => (
                        <span
                          key={badgeIndex}
                          className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded text-xs"
                        >
                          🏅 {badge}
                        </span>
                      ))}
                      {user.badges.length > 5 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                          +{user.badges.length - 5} more
                        </span>
                      )}
                    </div>
                  )}
                </div>

                {/* Points */}
                <div className="text-right">
                  <div className="flex items-center justify-end space-x-2">
                    <span className="text-4xl font-bold text-yellow-600">{user.points}</span>
                    <span className="text-yellow-500 text-2xl">⭐</span>
                  </div>
                  <p className="text-gray-500 text-sm">points</p>
                </div>
              </div>

              {/* Celebration for top 3 */}
              {index < 3 && (
                <div className={`h-1 bg-gradient-to-r ${getRankColor(index)}`}></div>
              )}
            </motion.div>
          ))
        )}
      </div>

      {/* Core Values Info */}
      <div className="bg-gradient-to-r from-purple-500 to-blue-600 text-white rounded-xl p-8 shadow-lg">
        <h2 className="text-2xl font-bold mb-4">🌟 Earn Points Through:</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white bg-opacity-20 rounded-lg p-4">
            <p className="font-bold mb-2">✅ Completing Tasks</p>
            <p className="text-sm">Finish assigned tasks to earn points</p>
          </div>
          <div className="bg-white bg-opacity-20 rounded-lg p-4">
            <p className="font-bold mb-2">🏅 Earning Badges</p>
            <p className="text-sm">Demonstrate core values to get badges</p>
          </div>
          <div className="bg-white bg-opacity-20 rounded-lg p-4">
            <p className="font-bold mb-2">🤝 Team Contribution</p>
            <p className="text-sm">Help teammates and attend meetings</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardPage;
