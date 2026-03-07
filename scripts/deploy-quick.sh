#!/bin/bash
# Quick BrightSign Deployment Script
# Uploads files directly from dist to player via LDWS REST API
#
# Usage:
#   ./scripts/deploy-quick.sh
#   PLAYER=192.168.0.100 ./scripts/deploy-quick.sh

set -e

# Configuration (can be overridden by environment variables)
PLAYER=${PLAYER:-192.168.0.51}
AUTH=${AUTH:-admin:BrightSign23!}
DIST_DIR=${DIST_DIR:-dist/packages/brightsign}

echo "🚀 Quick BrightSign Deploy"
echo "📺 Player: $PLAYER"
echo "📦 Source: $DIST_DIR"
echo ""

# Check if dist directory exists
if [ ! -d "$DIST_DIR" ]; then
  echo "❌ Error: $DIST_DIR not found"
  echo "   Run: pnpm package:player first"
  exit 1
fi

# Test connectivity using working endpoint
echo "🔍 Testing connection..."
if curl --digest -u "$AUTH" -k -s https://$PLAYER/api/v1/files/sd/ > /dev/null 2>&1; then
  echo "✅ Player is reachable"
else
  echo "❌ Cannot reach player at $PLAYER"
  echo "   Check IP address and credentials"
  exit 1
fi

# Upload all files
echo ""
echo "📤 Uploading files..."
file_count=0
for file in "$DIST_DIR"/*; do
  if [ -f "$file" ]; then
    filename=$(basename "$file")
    if curl --digest -u "$AUTH" -k -s -X PUT -F "file=@$file" https://$PLAYER/api/v1/files/sd/ > /dev/null 2>&1; then
      echo "  ✅ $filename"
      ((file_count++))
    else
      echo "  ❌ $filename"
    fi
  fi
done

# Upload subdirectories (e.g., assets/)
for dir in "$DIST_DIR"/*/; do
  if [ -d "$dir" ]; then
    dirname=$(basename "$dir")
    echo ""
    echo "📁 Uploading $dirname/..."
    for file in "$dir"*; do
      if [ -f "$file" ]; then
        filename=$(basename "$file")
        if curl --digest -u "$AUTH" -k -s -X PUT -F "file=@$file" https://$PLAYER/api/v1/files/sd/$dirname/ > /dev/null 2>&1; then
          echo "  ✅ $dirname/$filename"
          ((file_count++))
        else
          echo "  ❌ $dirname/$filename"
        fi
      fi
    done
  fi
done

echo ""
echo "✅ Uploaded $file_count files"

# Reboot player
echo ""
echo "🔄 Rebooting player..."
if curl --digest -u "$AUTH" -k -s -X POST https://$PLAYER/api/v1/control/reboot > /dev/null 2>&1; then
  echo "✅ Reboot command sent"
else
  echo "⚠️  Could not send reboot command"
fi

echo ""
echo "✅ Deployment complete!"
echo "📺 Check the player display to verify the app is running"
echo "🔍 Debug inspector: http://$PLAYER:2999"
