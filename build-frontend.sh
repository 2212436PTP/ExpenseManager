#!/bin/bash

echo "🚀 Building Expense Manager Frontend for Deployment..."
echo "================================================="

# Check if we're in the right directory
if [ ! -f "apps/web/package.json" ]; then
    echo "❌ Error: Please run this script from the project root directory"
    exit 1
fi

# Navigate to web app
cd apps/web

echo "📦 Installing dependencies..."
npm install

echo "🔍 Running type check..."
npx tsc --noEmit

echo "🧹 Running linter..."
npm run lint

echo "🏗️ Building for production..."
npm run build

echo "📊 Build statistics:"
echo "==================="
du -sh dist/
echo "Files in dist:"
ls -la dist/

echo ""
echo "✅ Build completed successfully!"
echo "📁 Output directory: apps/web/dist"
echo "🌐 Ready for Netlify deployment!"
echo ""
echo "🚀 Deploy commands:"
echo "1. Manual: Drag & drop 'dist' folder to netlify.com"
echo "2. CLI: netlify deploy --prod --dir=dist"
echo "3. GitHub: Push to repository connected to Netlify"