#!/bin/bash
set -e

# ============================================================
# Resume Builder — AWS EC2 Deployment Script
# ============================================================
# Usage:
#   1. Update EC2_HOST and KEY below with your values
#   2. Run: chmod +x deploy.sh && ./deploy.sh
# ============================================================

EC2_HOST="ec2-user@<EC2_PUBLIC_IP>"
KEY="~/.ssh/resume-builder-key.pem"
APP_DIR="~/resume-builder"

echo ""
echo "=========================================="
echo "  🚀 Resume Builder — Deploy to AWS EC2"
echo "=========================================="
echo ""

# Step 1: Build frontend locally
echo "🔨 [1/3] Building frontend..."
npm run build
echo "   ✅ Build complete"
echo ""

# Step 2: Sync files to EC2 (excludes node_modules, .git, and env files)
echo "📦 [2/3] Syncing files to EC2..."
rsync -avz --delete \
  --exclude 'node_modules' \
  --exclude '.git' \
  --exclude '.env' \
  --exclude '.env.local' \
  --exclude '.env.production.example' \
  -e "ssh -i $KEY" \
  ./ "$EC2_HOST:$APP_DIR/"
echo "   ✅ Files synced"
echo ""

# Step 3: Install production deps and restart PM2 on server
echo "🔄 [3/3] Installing dependencies and restarting server..."
ssh -i "$KEY" "$EC2_HOST" << 'REMOTE_SCRIPT'
  cd ~/resume-builder
  npm install --omit=dev
  pm2 restart resume-builder || pm2 start npm --name "resume-builder" -- start
REMOTE_SCRIPT
echo "   ✅ Server restarted"
echo ""

echo "=========================================="
echo "  ✅ Deployment complete!"
echo "  🌐 Visit: http://<EC2_PUBLIC_IP>"
echo "=========================================="
