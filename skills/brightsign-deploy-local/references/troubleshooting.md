# Local Deploy Troubleshooting

## Connection refused or endpoint not responding

**Cause:** Player is rebooting or LDWS temporarily unavailable

**Solution:**

- Wait 30-60 seconds after reboot for LDWS to start
- `/api/v1/info/` may be unavailable during transient states
- Use `/api/v1/files/sd/` as primary connectivity check (more reliable)
- Player responds to ping before LDWS is fully ready

## Upload fails with "Connection refused"

**Cause:** Diagnostic web server not enabled

**Solution:**

- Access player menu
- Enable "Diagnostic Web Server" in settings
- Reboot player

## Upload succeeds but app doesn't start

**Cause:** Missing or incorrect autorun.brs

**Solution:**

- Verify autorun.brs is in package root
- Check `file:///sd:/index.html` path in autorun.brs
- View logs via remote inspector or `/api/v1/info/`

## Player reboot hangs

**Cause:** Player may be busy writing to storage

**Solution:**

- Wait 30 seconds
- If still hung, power cycle player manually
- Check logs after restart

## Can't find player IP

**Cause:** Player on different subnet or DHCP not configured

**Solution:**

- Use static IP in player network settings
- Check router DHCP reservations
- Connect player directly to dev machine (crossover)
- Use `player-discovery-scan` skill to scan subnet

## Files upload but overwrite fails

**Cause:** Player storage is full

**Solution:**

- Check storage via player info endpoint
- Delete old files via diagnostic API
- Use smaller bundles (see `brightsign-package` optimization tips)
