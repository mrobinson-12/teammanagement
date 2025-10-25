#!/bin/bash

echo "🤖 FLL Team Manager - Local Development Setup"
echo "=============================================="
echo ""

# Check if MongoDB is running
echo "📝 Checking MongoDB..."
if ! command -v mongod &> /dev/null; then
    echo "⚠️  MongoDB not found. Please install MongoDB first."
    echo "   Visit: https://www.mongodb.com/try/download/community"
    echo ""
fi

# Backend setup
echo "🔧 Setting up backend..."
cd backend

if [ ! -f ".env" ]; then
    echo "📄 Creating .env file from example..."
    cp .env.example .env
    echo "✅ .env file created. Please update with your configuration."
fi

if [ ! -d "node_modules" ]; then
    echo "📦 Installing backend dependencies..."
    npm install
fi

echo "🏗️  Building backend..."
npm run build

echo ""
echo "✅ Backend setup complete!"
echo ""

# Frontend setup
echo "🎨 Setting up frontend..."
cd ../frontend

if [ ! -f ".env" ]; then
    echo "📄 Creating .env file from example..."
    cp .env.example .env
fi

if [ ! -d "node_modules" ]; then
    echo "📦 Installing frontend dependencies..."
    npm install
fi

echo ""
echo "✅ Frontend setup complete!"
echo ""

cd ..

echo "🎉 Setup complete!"
echo ""
echo "To start development:"
echo "  1. Start MongoDB: mongod --dbpath=/path/to/data"
echo "  2. Backend: cd backend && npm run dev"
echo "  3. Frontend: cd frontend && npm start"
echo ""
echo "Or use Docker:"
echo "  docker-compose up"
echo ""
