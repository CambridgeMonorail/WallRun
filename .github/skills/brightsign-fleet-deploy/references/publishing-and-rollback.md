# Publishing and Rollback

## Build Production Bundle

```bash
# Production build with optimizations
nx build player-minimal --configuration=production

# Verify bundle size
du -sh dist/apps/player-minimal/
ls -lh dist/apps/player-minimal/assets/*.js
```

**Production checklist:**

- ✅ Bundle size < 200KB gzipped
- ✅ Source maps disabled or separate
- ✅ console.log removed
- ✅ Environment variables set correctly
- ✅ API endpoints point to production

## Create Release Package

```bash
VERSION=$(cat package.json | grep '"version"' | cut -d'"' -f4)
cd dist/brightsign-package

zip -r ../player-minimal-v${VERSION}.zip .

# Verify package
cd ../..
unzip -l dist/player-minimal-v${VERSION}.zip

# Should contain:
# - autorun.brs
# - index.html
# - assets/ directory
# - manifest.json
```

## Publish to GitHub Releases

### Option A: GitHub CLI (Recommended)

```bash
gh auth login

VERSION=$(cat package.json | grep '"version"' | cut -d'"' -f4)

gh release create "v${VERSION}" \
  --title "Player Minimal v${VERSION}" \
  --notes "Release v${VERSION} - See CHANGELOG.md for details" \
  dist/player-minimal-v${VERSION}.zip
```

### Option B: Manual (GitHub Web UI)

1. Go to the repository's Releases page
2. Click "Draft a new release"
3. Tag: `v1.2.3` (matches package.json version)
4. Title: `Player Minimal v1.2.3`
5. Description: Release notes and changelog
6. Attach: `player-minimal-v1.2.3.zip`
7. Click "Publish release"

### Option C: GitHub API

```bash
VERSION=$(cat package.json | grep '"version"' | cut -d'"' -f4)
GITHUB_TOKEN="your_personal_access_token"

RELEASE_DATA=$(cat <<EOF
{
  "tag_name": "v${VERSION}",
  "name": "Player Minimal v${VERSION}",
  "body": "Release v${VERSION}",
  "draft": false,
  "prerelease": false
}
EOF
)

RELEASE_RESPONSE=$(curl -X POST \
  -H "Authorization: token ${GITHUB_TOKEN}" \
  -H "Content-Type: application/json" \
  -d "${RELEASE_DATA}" \
  https://api.github.com/repos/CambridgeMonorail/TheSignAge/releases)

UPLOAD_URL=$(echo "${RELEASE_RESPONSE}" | grep -Po '"upload_url": "\K[^"]*' | sed 's/{?name,label}//')

curl -X POST \
  -H "Authorization: token ${GITHUB_TOKEN}" \
  -H "Content-Type: application/zip" \
  --data-binary "@dist/player-minimal-v${VERSION}.zip" \
  "${UPLOAD_URL}?name=player-minimal-v${VERSION}.zip"
```

## Update Manifest Endpoint

Publish the latest `manifest.json` for player polling:

```bash
# Option 1: GitHub Pages
cp dist/brightsign-package/manifest.json docs/releases/latest-manifest.json
git add docs/releases/latest-manifest.json
git commit -m "chore: update manifest to v${VERSION}"
git push

# Option 2: S3/CDN
aws s3 cp dist/brightsign-package/manifest.json s3://your-bucket/player-minimal/latest-manifest.json

# Option 3: GitHub Gist
gh gist create dist/brightsign-package/manifest.json --public
```

## Rollback Strategy

If a release has issues:

```bash
# 1. Identify last good version
gh release list

# 2. Update manifest to point to previous version
# Edit docs/releases/latest-manifest.json
# Change "version" and "downloadUrl" to previous release

# 3. Commit and push
git add docs/releases/latest-manifest.json
git commit -m "chore: rollback to v1.0.0"
git push

# 4. Players will download previous version on next update check
```
