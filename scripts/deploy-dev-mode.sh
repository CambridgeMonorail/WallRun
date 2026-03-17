#!/bin/bash
# Deploy Development Mode Bootstrap to BrightSign Player
# This uploads ONLY the autorun.brs that loads from your dev server
#
# Usage:
#   AUTH=admin:CHANGEME ./scripts/deploy-dev-mode.sh
#   PLAYER=192.168.0.62 AUTH=admin:CHANGEME ./scripts/deploy-dev-mode.sh
#   BRIGHTSIGN_CA_CERT=/path/to/player-ca.pem ./scripts/deploy-dev-mode.sh
#   BRIGHTSIGN_TLS_INSECURE=1 ./scripts/deploy-dev-mode.sh   # Explicit opt-out

set -e

# Configuration
PLAYER=${PLAYER:-192.168.0.62}
AUTH=${AUTH:-}
AUTORUN_FILE="tools/brightsign-test-files/autorun-dev.brs"
DEV_SERVER_IP=${DEV_SERVER_IP:-}
TEMP_AUTORUN_FILE=""

cleanup() {
  if [ -n "$TEMP_AUTORUN_FILE" ] && [ -f "$TEMP_AUTORUN_FILE" ]; then
    rm -f "$TEMP_AUTORUN_FILE"
  fi
}

trap cleanup EXIT

detect_local_ip() {
  if [ -n "$DEV_SERVER_IP" ]; then
    printf '%s' "$DEV_SERVER_IP"
    return 0
  fi

  local detected_ip=""

  if command -v ip >/dev/null 2>&1; then
    detected_ip=$(ip route get "$PLAYER" 2>/dev/null | awk '{for (i = 1; i <= NF; i++) if ($i == "src") { print $(i + 1); exit }}')
  fi

  if [ -z "$detected_ip" ] && command -v route >/dev/null 2>&1; then
    local route_interface
    route_interface=$(route -n get "$PLAYER" 2>/dev/null | awk '/interface:/{print $2; exit}')

    if [ -n "$route_interface" ] && command -v ipconfig >/dev/null 2>&1; then
      detected_ip=$(ipconfig getifaddr "$route_interface" 2>/dev/null || true)
    fi

    if [ -z "$detected_ip" ] && [ -n "$route_interface" ] && command -v ifconfig >/dev/null 2>&1; then
      detected_ip=$(ifconfig "$route_interface" 2>/dev/null | awk '/inet / { print $2; exit }')
    fi
  fi

  printf '%s' "$detected_ip"
}

if [ -z "$AUTH" ]; then
  echo "❌ Error: AUTH environment variable is required"
  echo "   Use the format AUTH=username:password"
  echo "   Example: AUTH=admin:CHANGEME ./scripts/deploy-dev-mode.sh"
  exit 1
fi

echo "🔧 BrightSign Development Mode Setup"
echo "📺 Player: $PLAYER"
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

# Check if autorun file exists
if [ ! -f "$AUTORUN_FILE" ]; then
  echo "❌ Error: $AUTORUN_FILE not found"
  exit 1
fi

# Test connectivity using working endpoint
echo "🔍 Testing connection..."
if curl "${CURL_BASE_ARGS[@]}" "${CURL_TLS_ARGS[@]}" https://$PLAYER/api/v1/files/sd/ > /dev/null 2>&1; then
  echo "✅ Player is reachable"
else
  echo "❌ Cannot reach player at $PLAYER"
  if [ "${BRIGHTSIGN_TLS_INSECURE:-0}" != "1" ] && [ -z "${BRIGHTSIGN_CA_CERT:-}" ]; then
    echo "   TLS verification failed or the player is unreachable."
    echo "   For self-signed certs, trust the certificate locally or use BRIGHTSIGN_CA_CERT."
    echo "   As a last resort for local development only, use BRIGHTSIGN_TLS_INSECURE=1."
  fi
  exit 1
fi

LOCAL_IP=$(detect_local_ip)

if [ -z "$LOCAL_IP" ]; then
  echo "❌ Could not determine the local IP address reachable by $PLAYER"
  echo "   Set DEV_SERVER_IP manually and rerun the script."
  exit 1
fi

TEMP_AUTORUN_FILE=$(mktemp "${TMPDIR:-/tmp}/autorun-dev.XXXXXX.brs")
sed "s/__DEV_SERVER_IP__/$LOCAL_IP/g" "$AUTORUN_FILE" > "$TEMP_AUTORUN_FILE"

echo ""
echo "⚙️  Preparing dev-mode autorun.brs"
echo "   Using dev server IP: $LOCAL_IP"

# Delete old autorun.brs
echo ""
echo "🗑️  Removing old autorun.brs..."
curl "${CURL_BASE_ARGS[@]}" "${CURL_TLS_ARGS[@]}" -X DELETE https://$PLAYER/api/v1/files/sd/autorun.brs > /dev/null 2>&1 || true

# Upload new autorun.brs
echo "📤 Uploading dev-mode autorun.brs..."
if curl "${CURL_BASE_ARGS[@]}" "${CURL_TLS_ARGS[@]}" -X PUT -F "file=@$TEMP_AUTORUN_FILE;filename=autorun.brs" https://$PLAYER/api/v1/files/sd/ > /dev/null 2>&1; then
  echo "✅ Uploaded autorun.brs"
else
  echo "❌ Upload failed"
  exit 1
fi

# Reboot player
echo ""
echo "🔄 Rebooting player..."
if curl "${CURL_BASE_ARGS[@]}" "${CURL_TLS_ARGS[@]}" -X PUT https://$PLAYER/api/v1/control/reboot > /dev/null 2>&1; then
  echo "✅ Reboot command sent"
else
  echo "⚠️  Could not send reboot command"
fi

echo ""
echo "✅ Development mode configured!"
echo ""
echo "📝 Next steps:"
echo "   1. Start your dev server: pnpm dev:brightsign"
echo "   2. Player will load from: http://$LOCAL_IP:5173"
echo "   3. Debug at chrome://inspect/devices"
echo "   4. Inspector: $PLAYER:2999"
echo ""
echo "💡 To switch back to production mode:"
echo "   pnpm deploy:player"
