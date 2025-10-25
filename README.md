# FLL Team Manager 🤖

A full-stack web application for coordinating FIRST LEGO League (FLL) robotics teams. This application helps teams plan meetings, assign roles, track robot-code versions, log research progress, and display competition readiness stats.

## 🚀 Features

### ✅ Completed Features

1. **Authentication & Profiles**
   - JWT-based authentication
   - User roles: Member & Mentor
   - Editable profiles with skill tags and meeting preferences
   - Points and badges system

2. **Team Dashboard**
   - Overview cards showing task progress, meetings, and points
   - Quick action links
   - Motivational quote of the day
   - Real-time statistics

3. **Task & Role Management**
   - Kanban board (To Do / In Progress / Done)
   - Task creation with priority levels
   - Task assignment and due dates
   - Core Values badge association
   - Drag-and-drop status updates

4. **Meeting Planner**
   - Calendar view with meeting scheduling
   - RSVP system (Yes/No/Maybe)
   - Meeting details (date, time, location, duration)
   - Past and upcoming meetings tracking

5. **Gamification & Awards**
   - Points system
   - Leaderboard with top performers
   - Badge collection
   - Visual rankings with medals

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **TailwindCSS** for styling
- **Framer Motion** for animations
- **React Router** for navigation
- **Axios** for API calls

### Backend
- **Node.js** with Express
- **TypeScript** for type safety
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **bcrypt** for password hashing
- **Helmet** for security headers
- **Rate limiting** for API protection

### DevOps
- **Docker** & Docker Compose
- **nodemon** for development
- Environment-based configuration

## 📦 Installation

### Prerequisites
- Node.js 20 or higher
- MongoDB 7 or higher
- npm or yarn

### Local Development Setup

1. **Clone the repository**
```bash
git clone https://github.com/mrobinson-12/teammanagement.git
cd teammanagement
```

2. **Backend Setup**
```bash
cd backend
npm install

# Create .env file from example
cp .env.example .env

# Update .env with your configuration
# JWT_SECRET should be a strong random string
# MONGODB_URI should point to your MongoDB instance

# Build TypeScript
npm run build

# Start development server
npm run dev
```

3. **Frontend Setup**
```bash
cd frontend
npm install

# Create .env file from example
cp .env.example .env

# Update REACT_APP_API_URL if needed

# Start development server
npm start
```

The frontend will be available at `http://localhost:3000` and the backend at `http://localhost:5000`.

### Docker Setup

For a complete setup with MongoDB, backend, and frontend:

```bash
# From the root directory
docker-compose up -d
```

This will start:
- MongoDB on port 27017
- Backend API on port 5000
- Frontend on port 3000

## 🔧 Configuration

### Backend Environment Variables

Create `backend/.env` with:

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/fll-team-manager
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=7d
FRONTEND_URL=http://localhost:3000
```

### Frontend Environment Variables

Create `frontend/.env` with:

```env
REACT_APP_API_URL=http://localhost:5000/api
```

## 📖 API Documentation

### Authentication Endpoints

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get current user profile (requires auth)

### Task Endpoints

- `GET /api/tasks` - Get all tasks
- `POST /api/tasks` - Create new task (requires auth)
- `GET /api/tasks/:id` - Get task by ID
- `PATCH /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task
- `POST /api/tasks/:id/comments` - Add comment to task

### Meeting Endpoints

- `GET /api/meetings` - Get all meetings
- `POST /api/meetings` - Create new meeting (requires auth)
- `GET /api/meetings/:id` - Get meeting by ID
- `PATCH /api/meetings/:id` - Update meeting
- `DELETE /api/meetings/:id` - Delete meeting
- `POST /api/meetings/:id/rsvp` - RSVP to meeting

### User Endpoints

- `GET /api/users` - Get all users (requires auth)
- `GET /api/users/leaderboard` - Get top users by points
- `GET /api/users/:id` - Get user by ID
- `PATCH /api/users/profile` - Update own profile
- `POST /api/users/award-points` - Award points to user (mentor only)

## 🎯 Usage Guide

### For Team Members

1. **Register** with your email and create an account as a "Team Member"
2. **View Dashboard** to see team progress and your stats
3. **Browse Tasks** on the Kanban board and update task status
4. **RSVP to Meetings** to let mentors know your availability
5. **Earn Points** by completing tasks and demonstrating core values
6. **Check Leaderboard** to see your ranking

### For Mentors

1. **Register** with the "Mentor" role
2. **Create Tasks** with priorities and assign them to team members
3. **Schedule Meetings** and track RSVPs
4. **Award Points** to recognize contributions (coming soon in UI)
5. **Monitor Progress** through the dashboard

## 🚧 Future Enhancements

### Planned Features

1. **Robot Code Version Tracker**
   - GitHub API integration
   - Commit history display
   - Build status monitoring
   - Version tagging

2. **Research & Innovation Log**
   - Markdown editor for documentation
   - File attachments
   - Mentor review workflow
   - Submission tracking

3. **Competition Readiness Tracker**
   - Progress checklist
   - Readiness percentage
   - PDF report export
   - Team heatmap visualization

4. **Chat & Announcements**
   - Real-time team chat
   - Mentor announcements
   - Notification system
   - Discord webhook integration

5. **File Uploads & Sharing**
   - Document upload
   - Google Drive integration
   - File organization by category

6. **Enhanced Gamification**
   - More badge types
   - Achievement unlocks
   - Celebration animations
   - Team challenges

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License.

## 👥 Target Audience

- **FLL Students** (ages 10-15)
- **Adult Mentors** and coaches
- **Robotics Teams** looking for coordination tools

## 🎉 Acknowledgments

Built to empower FLL teams to succeed through better organization, communication, and collaboration!

---

**Made with ❤️ for the FLL robotics community** 🚀

