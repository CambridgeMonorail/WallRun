# BrightSign Debug Workflow Fixes

## Goal

Make the BrightSign dev-mode workflow reproducible by fixing the dev bootstrap, correcting the deploy script, and updating the debug documentation. Restore the test player from dev bootstrap back to packaged app flow after the fixes are prepared.

## Context

Observed during live testing against player 192.168.0.62:

- `scripts/deploy-dev-mode.sh` uses the wrong reboot method for LDWS (`POST` instead of `PUT`).
- The script's local IP detection path is wrong on macOS and prints an empty value.
- The dev bootstrap needed `enable_web_inspector=1` in the `html` registry for port 2999 to open on this player.
- One troubleshooting reference still points Chrome inspect at port 8008 instead of 2999.
- The local working copy of `autorun-dev.brs` contains machine-specific IP and password values from ad hoc debugging and must be generalized.

## Tasks

1. Update the dev bootstrap to use placeholders, enable the web inspector registry, and document optional SSH enablement without hardcoded credentials.
2. Fix `scripts/deploy-dev-mode.sh` to detect a usable local IP on macOS/Linux, avoid manual file editing where possible, preserve the `autorun.brs` filename on upload, and reboot with `PUT`.
3. Update BrightSign debug/deploy docs to match the verified workflow and inspector port.
4. Restore the player to packaged app flow.
5. Verify the script behavior locally and confirm the player is back on packaged content.

## Files

- `tools/brightsign-test-files/autorun-dev.brs`
- `scripts/deploy-dev-mode.sh`
- `.github/skills/brightsign-debug/references/diagnostic-commands.md`
- `.github/skills/brightsign-debug/references/troubleshooting.md`
- `.github/skills/brightsign-deploy-local/references/api-and-commands.md`

## Verification

- Run the dev-mode script with `--help`-equivalent validation via shell syntax checks where applicable.
- Confirm the player can be restored with `pnpm deploy:player`.
- Verify player uptime resets after packaged deploy and that the dev-only ports are no longer required for normal packaged execution.
