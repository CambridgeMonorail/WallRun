#!/bin/bash
# Quick BrightSign Deployment Script
# Uploads files directly from dist to player via LDWS REST API
#
# Usage:
#   AUTH=admin:CHANGEME ./scripts/deploy-quick.sh
#   PLAYER=192.168.0.100 AUTH=admin:CHANGEME ./scripts/deploy-quick.sh
#   BRIGHTSIGN_CA_CERT=/path/to/player-ca.pem ./scripts/deploy-quick.sh
#   BRIGHTSIGN_TLS_INSECURE=1 ./scripts/deploy-quick.sh   # Explicit opt-out

set -e

# Configuration (can be overridden by environment variables)
PLAYER=${PLAYER:-192.168.0.62}
AUTH=${AUTH:-}
DIST_DIR=${DIST_DIR:-dist/packages/brightsign}

if [ -z "$AUTH" ]; then
  echo "❌ Error: AUTH environment variable is required"
  echo "   Use the format AUTH=username:password"
  echo "   Example: AUTH=admin:CHANGEME ./scripts/deploy-quick.sh"
  exit 1
fi

echo "🚀 Quick BrightSign Deploy"
echo "📺 Player: $PLAYER"
echo "📦 Source: $DIST_DIR"
echo ""

CURL_BASE_ARGS=(--digest -u "$AUTH" -s)

if [ -n "${BRIGHTSIGN_CA_CERT:-}" ]; then
  CURL_TLS_ARGS=(--cacert "$BRIGHTSIGN_CA_CERT")
  echo "🔒 TLS certificate verification enabled with BRIGHTSIGN_CA_CERT"
elif [ "${BRIGHTSIGN_TLS_INSECURE:-0}" = "1" ]; then
  CURL_TLS_ARGS=(-k)
  echo "⚠️  TLS certificate verification disabled via BRIGHTSIGN_TLS_INSECURE=1"
else
  CURL_TLS_ARGS=()
  echo "🔒 TLS certificate verification enabled"
  echo "   If the player uses a self-signed certificate, trust it locally"
  echo "   or rerun with BRIGHTSIGN_CA_CERT=/path/to/player-ca.pem"
  echo "   or BRIGHTSIGN_TLS_INSECURE=1 for a one-off local development exception"
fi

# Check if dist directory exists
if [ ! -d "$DIST_DIR" ]; then
  echo "❌ Error: $DIST_DIR not found"
  echo "   Run: pnpm package:player first"
  exit 1
fi

# Test connectivity using working endpoint
echo "🔍 Testing connection..."
if curl "${CURL_BASE_ARGS[@]}" "${CURL_TLS_ARGS[@]}" https://$PLAYER/api/v1/files/sd/ > /dev/null 2>&1; then
  echo "✅ Player is reachable"
else
  echo "❌ Cannot reach player at $PLAYER"
  echo "   Check IP address and credentials"
  if [ "${BRIGHTSIGN_TLS_INSECURE:-0}" != "1" ] && [ -z "${BRIGHTSIGN_CA_CERT:-}" ]; then
    echo "   TLS verification failed or the player is unreachable."
    echo "   For self-signed certs, trust the certificate locally or use BRIGHTSIGN_CA_CERT."
    echo "   As a last resort for local development only, use BRIGHTSIGN_TLS_INSECURE=1."
  fi
  exit 1
fi

# Upload all files
echo ""
echo "📤 Uploading files..."
file_count=0
for file in "$DIST_DIR"/*; do
  if [ -f "$file" ]; then
    filename=$(basename "$file")
    if curl "${CURL_BASE_ARGS[@]}" "${CURL_TLS_ARGS[@]}" -X PUT -F "file=@$file" https://$PLAYER/api/v1/files/sd/ > /dev/null 2>&1; then
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
        if curl "${CURL_BASE_ARGS[@]}" "${CURL_TLS_ARGS[@]}" -X PUT -F "file=@$file" https://$PLAYER/api/v1/files/sd/$dirname/ > /dev/null 2>&1; then
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
if curl "${CURL_BASE_ARGS[@]}" "${CURL_TLS_ARGS[@]}" -X PUT https://$PLAYER/api/v1/control/reboot > /dev/null 2>&1; then
  echo "✅ Reboot command sent"
else
  echo "⚠️  Could not send reboot command"
fi

echo ""
echo "✅ Deployment complete!"
echo "📺 Check the player display to verify the app is running"
echo "🔍 Remote inspector is disabled in the production bootstrap by default"
echo "   Use dev mode if you need Chrome DevTools access on port 2999"
