#!/bin/bash
# Deploy Development Mode Bootstrap to BrightSign Player
# This uploads ONLY the autorun.brs that loads from your dev server
#
# Usage:
#   ./scripts/deploy-dev-mode.sh
#   PLAYER=192.168.0.51 ./scripts/deploy-dev-mode.sh

set -e

# Configuration
PLAYER=${PLAYER:-192.168.0.51}
AUTH=${AUTH:-admin:BrightSign23!}
AUTORUN_FILE="tools/brightsign-test-files/autorun-dev.brs"

echo "🔧 BrightSign Development Mode Setup"
echo "📺 Player: $PLAYER"
echo ""

# Check if autorun file exists
if [ ! -f "$AUTORUN_FILE" ]; then
  echo "❌ Error: $AUTORUN_FILE not found"
  exit 1
fi

# Test connectivity
echo "🔍 Testing connection..."
if curl --digest -u "$AUTH" -k -s https://$PLAYER/api/v1/info > /dev/null 2>&1; then
  echo "✅ Player is reachable"
else
  echo "❌ Cannot reach player at $PLAYER"
  exit 1
fi

# Get local IP address (for display only)
if command -v ip &> /dev/null; then
  LOCAL_IP=$(ip route get 1 | awk '{print $7; exit}')
elif command -v ipconfig &> /dev/null; then
  # Windows
  LOCAL_IP=$(ipconfig | grep -i "IPv4" | head -1 | awk '{print $NF}')
else
  LOCAL_IP="YOUR_LOCAL_IP"
fi

echo ""
echo "⚙️  Before deploying, edit $AUTORUN_FILE"
echo "   Change DEV_SERVER_IP to: $LOCAL_IP"
read -p "   Press Enter when ready..."

# Delete old autorun.brs
echo ""
echo "🗑️  Removing old autorun.brs..."
curl --digest -u "$AUTH" -k -s -X DELETE https://$PLAYER/api/v1/files/sd/autorun.brs > /dev/null 2>&1 || true

# Upload new autorun.brs
echo "📤 Uploading dev-mode autorun.brs..."
if curl --digest -u "$AUTH" -k -s -X PUT -F "file=@$AUTORUN_FILE" https://$PLAYER/api/v1/files/sd/ > /dev/null 2>&1; then
  echo "✅ Uploaded autorun.brs"
else
  echo "❌ Upload failed"
  exit 1
fi

# Reboot player
echo ""
echo "🔄 Rebooting player..."
if curl --digest -u "$AUTH" -k -s -X POST https://$PLAYER/api/v1/control/reboot > /dev/null 2>&1; then
  echo "✅ Reboot command sent"
else
  echo "⚠️  Could not send reboot command"
fi

echo ""
echo "✅ Development mode configured!"
echo ""
echo "📝 Next steps:"
echo "   1. Start your dev server: pnpm dev -- --host 0.0.0.0"
echo "   2. Player will load from: http://$LOCAL_IP:5173"
echo "   3. Debug at chrome://inspect/devices"
echo "   4. Inspector: $PLAYER:2999"
echo ""
echo "💡 To switch back to production mode:"
echo "   pnpm deploy:player"
