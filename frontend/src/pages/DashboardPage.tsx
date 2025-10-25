import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import api from '../services/api';
import { motion } from 'framer-motion';

const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalTasks: 0,
    completedTasks: 0,
    upcomingMeetings: 0,
    teamPoints: 0
  });
  const [quote] = useState(getMotivationalQuote());

  const fetchDashboardData = async () => {
    try {
      const [tasksRes, meetingsRes] = await Promise.all([
        api.get('/tasks'),
        api.get('/meetings?upcoming=true')
      ]);

      const tasks = tasksRes.data.tasks || [];
      const meetings = meetingsRes.data.meetings || [];

      setStats({
        totalTasks: tasks.length,
        completedTasks: tasks.filter((t: any) => t.status === 'done').length,
        upcomingMeetings: meetings.length,
        teamPoints: user?.points || 0
      });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  };

  useEffect(() => {
    fetchDashboardData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const cards = [
    {
      title: 'Tasks',
      value: `${stats.completedTasks}/${stats.totalTasks}`,
      subtitle: 'Completed',
      icon: '✅',
      color: 'bg-blue-500',
      link: '/tasks'
    },
    {
      title: 'Meetings',
      value: stats.upcomingMeetings,
      subtitle: 'Upcoming',
      icon: '📅',
      color: 'bg-green-500',
      link: '/meetings'
    },
    {
      title: 'Your Points',
      value: stats.teamPoints,
      subtitle: 'Total Earned',
      icon: '⭐',
      color: 'bg-yellow-500',
      link: '/leaderboard'
    },
    {
      title: 'Team Status',
      value: '🔥',
      subtitle: 'On Track!',
      icon: '🚀',
      color: 'bg-purple-500',
      link: '/'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl p-8 shadow-lg">
        <h1 className="text-4xl font-bold mb-2">
          Welcome back, {user?.firstName}! 👋
        </h1>
        <p className="text-blue-100 text-lg">
          Let's make today count for your FLL team!
        </p>
      </div>

      {/* Motivational Quote */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-xl p-6 shadow-md border-l-4 border-yellow-500"
      >
        <p className="text-gray-700 italic text-lg">"{quote.text}"</p>
        <p className="text-gray-500 text-sm mt-2">— {quote.author}</p>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, index) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + index * 0.1 }}
          >
            <Link to={card.link}>
              <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl">{card.icon}</span>
                  <div className={`${card.color} w-12 h-12 rounded-full flex items-center justify-center text-white text-xl`}>
                    {card.icon}
                  </div>
                </div>
                <h3 className="text-gray-600 text-sm font-medium mb-1">{card.title}</h3>
                <p className="text-3xl font-bold text-gray-800 mb-1">{card.value}</p>
                <p className="text-gray-500 text-sm">{card.subtitle}</p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            to="/tasks"
            className="flex items-center space-x-3 p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
          >
            <span className="text-2xl">➕</span>
            <span className="font-medium text-gray-700">Create New Task</span>
          </Link>
          <Link
            to="/meetings"
            className="flex items-center space-x-3 p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors"
          >
            <span className="text-2xl">📅</span>
            <span className="font-medium text-gray-700">Schedule Meeting</span>
          </Link>
          <Link
            to="/profile"
            className="flex items-center space-x-3 p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors"
          >
            <span className="text-2xl">⚙️</span>
            <span className="font-medium text-gray-700">Update Profile</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

function getMotivationalQuote() {
  const quotes = [
    { text: "The best way to predict the future is to invent it.", author: "Alan Kay" },
    { text: "Innovation distinguishes between a leader and a follower.", author: "Steve Jobs" },
    { text: "Coming together is a beginning, staying together is progress, and working together is success.", author: "Henry Ford" },
    { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
    { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill" },
    { text: "Teamwork makes the dream work.", author: "John C. Maxwell" },
    { text: "Alone we can do so little; together we can do so much.", author: "Helen Keller" }
  ];
  return quotes[Math.floor(Math.random() * quotes.length)];
}

export default DashboardPage;
