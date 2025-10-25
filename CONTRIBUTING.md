# Contributing to FLL Team Manager

Thank you for your interest in contributing to the FLL Team Manager project! This guide will help you get started.

## 🚀 Getting Started

### Prerequisites
- Node.js 20 or higher
- MongoDB 7 or higher
- npm or yarn
- Git

### Local Development Setup

1. **Clone the repository**
```bash
git clone https://github.com/mrobinson-12/teammanagement.git
cd teammanagement
```

2. **Run the setup script**
```bash
chmod +x setup-dev.sh
./setup-dev.sh
```

Or manually:

3. **Backend Setup**
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your configuration
npm run build
npm run dev
```

4. **Frontend Setup**
```bash
cd frontend
npm install
cp .env.example .env
# Edit .env if needed
npm start
```

## 📋 Development Workflow

### Branch Naming Convention
- Feature: `feature/description`
- Bug fix: `bugfix/description`
- Hotfix: `hotfix/description`

### Commit Message Format
Use clear, descriptive commit messages:
```
feat: add user avatar upload
fix: resolve JWT token expiration issue
docs: update API documentation
style: format code with prettier
refactor: restructure task controller
test: add unit tests for auth middleware
```

### Pull Request Process

1. **Create a new branch**
```bash
git checkout -b feature/your-feature-name
```

2. **Make your changes**
   - Write clean, readable code
   - Follow the existing code style
   - Add comments for complex logic
   - Update documentation if needed

3. **Test your changes**
```bash
# Backend
cd backend
npm run build
npm test

# Frontend
cd frontend
npm run build
npm test
```

4. **Commit your changes**
```bash
git add .
git commit -m "feat: your descriptive message"
```

5. **Push to your fork**
```bash
git push origin feature/your-feature-name
```

6. **Create a Pull Request**
   - Go to GitHub
   - Click "New Pull Request"
   - Describe your changes
   - Link related issues

## 🏗️ Project Structure

```
teammanagement/
├── backend/
│   ├── src/
│   │   ├── controllers/    # Request handlers
│   │   ├── models/         # MongoDB models
│   │   ├── routes/         # API routes
│   │   ├── middleware/     # Express middleware
│   │   └── server.ts       # Entry point
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── contexts/       # React contexts
│   │   ├── pages/          # Page components
│   │   ├── services/       # API service layer
│   │   └── App.tsx         # Root component
│   ├── package.json
│   └── tailwind.config.js
└── docker-compose.yml
```

## 🎨 Code Style Guidelines

### TypeScript
- Use TypeScript for type safety
- Define interfaces for all data structures
- Avoid `any` type when possible
- Use async/await for asynchronous operations

### React
- Use functional components with hooks
- Keep components small and focused
- Use meaningful component and variable names
- Follow React best practices

### CSS/Tailwind
- Use Tailwind utility classes
- Keep custom CSS minimal
- Use consistent spacing and colors
- Ensure responsive design

## 🧪 Testing

### Backend Testing
```bash
cd backend
npm test
```

### Frontend Testing
```bash
cd frontend
npm test
```

## 📝 Documentation

When adding new features:
1. Update README.md if needed
2. Add JSDoc comments to functions
3. Document API endpoints
4. Update this CONTRIBUTING.md

## 🐛 Reporting Bugs

When reporting bugs, include:
- Description of the issue
- Steps to reproduce
- Expected behavior
- Actual behavior
- Screenshots if applicable
- Environment details (OS, Node version, etc.)

## 💡 Suggesting Features

For feature requests:
- Clearly describe the feature
- Explain the use case
- Consider impact on existing features
- Provide examples or mockups

## 🔒 Security

If you discover a security vulnerability:
- Do NOT open a public issue
- Email the maintainers directly
- Include details about the vulnerability
- Allow time for a fix before disclosure

## 📜 Code of Conduct

- Be respectful and inclusive
- Welcome newcomers
- Focus on constructive feedback
- Respect different viewpoints
- Prioritize the community

## ✅ Checklist for Contributors

Before submitting a PR:
- [ ] Code builds without errors
- [ ] All tests pass
- [ ] New features have tests
- [ ] Documentation is updated
- [ ] Code follows style guidelines
- [ ] Commits are clear and descriptive
- [ ] Branch is up to date with main

## 🎯 Priority Areas

Current priority areas for contribution:
1. GitHub API integration for code tracking
2. Research log with markdown editor
3. File upload functionality
4. Competition readiness tracker
5. Real-time chat features
6. Additional unit tests

## 📞 Getting Help

- Open an issue for questions
- Check existing issues and PRs
- Review documentation
- Ask in discussions

## 🎉 Recognition

Contributors will be:
- Listed in the README
- Mentioned in release notes
- Part of the FLL Team Manager community!

Thank you for contributing! 🚀
