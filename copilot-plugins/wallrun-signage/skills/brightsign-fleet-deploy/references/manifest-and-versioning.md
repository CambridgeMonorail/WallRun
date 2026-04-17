# Manifest Schema and Versioning

## Release Manifest

Generate `manifest.json` with version metadata:

```bash
# Read version from package.json
VERSION=$(cat package.json | grep '"version"' | cut -d'"' -f4)
COMMIT=$(git rev-parse --short HEAD)
BUILD_TIME=$(date -Iseconds)

# Create manifest
cat > dist/brightsign-package/manifest.json << EOF
{
  "name": "player-minimal",
  "version": "${VERSION}",
  "commit": "${COMMIT}",
  "buildTime": "${BUILD_TIME}",
  "minOSVersion": "9.0.0",
  "checksum": "",
  "downloadUrl": "https://github.com/CambridgeMonorail/WallRun/releases/download/v${VERSION}/player-minimal-v${VERSION}.zip",
  "releaseNotes": "Release v${VERSION}",
  "changelog": []
}
EOF

# Calculate checksum (SHA256)
cd dist/brightsign-package
CHECKSUM=$(find . -type f ! -name 'manifest.json' -exec sha256sum {} \; | sort | sha256sum | cut -d' ' -f1)
cd ../..

# Update manifest with checksum
sed -i "s/\"checksum\": \"\"/\"checksum\": \"${CHECKSUM}\"/" dist/brightsign-package/manifest.json
```

### Manifest Fields

| Field          | Description                                                  |
| -------------- | ------------------------------------------------------------ |
| `version`      | Semantic version (x.y.z)                                     |
| `commit`       | Git commit SHA for traceability                              |
| `buildTime`    | ISO 8601 timestamp                                           |
| `minOSVersion` | Minimum BrightSign OS version required                       |
| `checksum`     | SHA256 hash of package contents (for integrity verification) |
| `downloadUrl`  | GitHub Releases download URL                                 |
| `releaseNotes` | Human-readable summary                                       |
| `changelog`    | Array of changes since last version                          |

## Version Guidelines

Follow semantic versioning (MAJOR.MINOR.PATCH):

```bash
# View current version
cat package.json | grep version

# Increment version (choose one)
npm version patch   # 1.0.0 → 1.0.1 (bug fixes)
npm version minor   # 1.0.1 → 1.1.0 (new features)
npm version major   # 1.1.0 → 2.0.0 (breaking changes)
```

| Level             | When to Use                       | Auto-update Safe?        |
| ----------------- | --------------------------------- | ------------------------ |
| **Patch** (1.0.x) | Bug fixes, no new features        | Yes                      |
| **Minor** (1.x.0) | New features, backward compatible | Yes                      |
| **Major** (x.0.0) | Breaking changes                  | Requires manual approval |
