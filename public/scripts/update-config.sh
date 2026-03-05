#!/bin/sh
# ------------------------------------------------------
# UbuntuNet captive portal setup script
# Installs, configures, and deploys Nodogsplash automatically
# ------------------------------------------------------

set -e  # stop on errors

CONF="/etc/config/nodogsplash"
BACKUP="/etc/config/nodogsplash.backup.$(date +%Y%m%d-%H%M%S)"
SPLASH_DIR="/etc/nodogsplash/htdocs"
SPLASH_FILE="$SPLASH_DIR/splash.html"

echo "[+] Checking Nodogsplash installation..."

# Check if nodogsplash is installed, install if missing
if ! command -v nodogsplash >/dev/null 2>&1; then
  echo "[+] Installing Nodogsplash..."
  opkg update >/dev/null 2>&1
  opkg install nodogsplash -d root || {
    echo "[❌] Failed to install Nodogsplash. Check internet connectivity."
    exit 1
  }
else
  echo "[✓] Nodogsplash already installed."
fi

# Ensure service is enabled
/etc/init.d/nodogsplash enable

echo "[+] Backing up current config to $BACKUP"
[ -f "$CONF" ] && cp "$CONF" "$BACKUP"

# ------------------------------------------------------
# Write the desired configuration
# ------------------------------------------------------
echo "[+] Writing new Nodogsplash config..."
cat <<'EOF' > "$CONF"
config nodogsplash 'lan'
  option enabled '1'
  option fwhook_enabled '1'
  option gatewayinterface 'br-lan'
  option gatewayname 'OpenWrt Nodogsplash'
  option maxclients '250'

  option preauthidletimeout '30'
  option authidletimeout '120'
  option sessiontimeout '1200'
  option redirecturl 'https://ubuntunet.withevolution.com/rewards'

  list preauthenticated_users 'allow tcp port 53'
  list preauthenticated_users 'allow udp port 53'
  list preauthenticated_users 'allow udp port 67'
  list preauthenticated_users 'allow udp port 68'

  list preauthenticated_users 'allow tcp to 172.67.199.162 port 80'
  list preauthenticated_users 'allow tcp to 172.67.199.162 port 443'
  list preauthenticated_users 'allow tcp to 104.21.21.168 port 80'
  list preauthenticated_users 'allow tcp to 104.21.21.168 port 443'

  option checkinterval '600'

  list authenticated_users 'allow all'

  list users_to_router 'allow tcp port 22'
  list users_to_router 'allow tcp port 23'
  list users_to_router 'allow tcp port 53'
  list users_to_router 'allow udp port 53'
  list users_to_router 'allow udp port 67'
  list users_to_router 'allow tcp port 80'
EOF

# ------------------------------------------------------
# Write splash page
# ------------------------------------------------------
echo "[+] Writing splash.html..."
mkdir -p "$SPLASH_DIR"
cat <<'HTML' > "$SPLASH_FILE"
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate">
<meta http-equiv="Pragma" content="no-cache">
<meta http-equiv="Expires" content="0">
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<link rel="shortcut icon" href="/images/splash.jpg" type="image/x-icon">
<link rel="stylesheet" type="text/css" href="/splash.css">
<title>$gatewayname Hotspot Gateway.</title>
</head>
<body>
Redirecting...
<script>
  const origin = encodeURIComponent(window.location.origin);
  const tok = "$tok";
  const clientip = "$clientip";
  const clientmac = "$clientmac";
  const target =
    "https://ubuntunet.withevolution.com/?" +
    "tok=" + tok +
    "&clientip=" + clientip +
    "&clientmac=" + clientmac +
    "&origin=" + origin;
  window.location.replace(target);
</script>
</body>
</html>
HTML

# ------------------------------------------------------
# Restart and verify
# ------------------------------------------------------
echo "[+] Restarting Nodogsplash..."
/etc/init.d/nodogsplash restart

if pgrep nodogsplash >/dev/null; then
  echo "[✅] Nodogsplash installed and running successfully!"
else
  echo "[⚠️] Nodogsplash failed to start. Check logs with: logread -e nodogsplash"
fi
