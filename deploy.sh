#!/bin/bash
set -e

# ============================================================
# Resume Builder — AWS EC2 Deployment Script
# ============================================================
# Usage:
#   1. Set your EC2 Host (e.g., ubuntu@1.2.3.4 or ec2-user@1.2.3.4)
#   2. Set your SSH PEM Key path
#   3. Run: chmod +x deploy.sh && ./deploy.sh
# ============================================================

EC2_HOST="ubuntu@<YOUR_EC2_PUBLIC_IP>"
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

# Step 2: Sync files to EC2
echo "📦 [2/3] Syncing files to EC2..."
rsync -avz --delete \
  --exclude 'node_modules' \
  --exclude '.git' \
  --exclude '.env' \
  --exclude '.env.local' \
  -e "ssh -i $KEY" \
  ./ "$EC2_HOST:$APP_DIR/"
echo "   ✅ Files synced"
echo ""

# Step 3: Install production deps and restart PM2 on EC2
echo "🔄 [3/3] Installing dependencies and restarting server..."
ssh -i "$KEY" "$EC2_HOST" << 'REMOTE_SCRIPT'
  cd ~/resume-builder
  npm install --omit=dev
  pm2 restart resume-builder-api || pm2 start server/index.js --name "resume-builder-api"
  pm2 save
REMOTE_SCRIPT
echo "   ✅ Server restarted"
echo ""

echo "=========================================="
echo "  ✅ Deployment complete!"
echo "  🌐 Visit your EC2 Public IP or Domain"
echo "=========================================="

