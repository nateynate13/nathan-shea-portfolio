# Spotify Integration - Quick Start Guide

## You're Almost There! 🎵

You've already created your Spotify app. Now just follow these 3 simple steps:

---

## Step 1: Update Spotify App Settings

1. Go to your [Spotify App Settings](https://developer.spotify.com/dashboard/12323df3c1a34dbdb1dc69b33895e43b/settings)
2. Click **"Edit Settings"**
3. Under **"Redirect URIs"**, add:
   ```
   https://www.nathan-shea.com/spotify-callback
   ```
4. Click **"Add"**, then **"Save"** at the bottom

---

## Step 2: Get Your Refresh Token

### Option A: Using Your Live Website (Recommended - Secure HTTPS)

1. Deploy `spotify-auth.html` and `spotify-callback.html` to your website
2. Visit: `https://www.nathan-shea.com/spotify-auth.html`
3. Click **"Connect with Spotify"**
4. Authorize the app
5. Copy the **refresh token** from the callback page

### Option B: Local Development (if not deployed yet)

If you haven't deployed yet, you can use localhost temporarily:

1. Add `http://localhost:8888/callback` to your Spotify app's Redirect URIs
2. Run: `node api/get-refresh-token.js`
3. Visit: `http://localhost:8888/login`
4. Copy the refresh token

---

## Step 3: Set Up Environment Variables

Create a `.env` file in your project root:

```env
SPOTIFY_CLIENT_ID=12323df3c1a34dbdb1dc69b33895e43b
SPOTIFY_CLIENT_SECRET=ea94a1d2e66849049260c59750fe1891
SPOTIFY_REFRESH_TOKEN=paste_your_refresh_token_here
```

**Important:** Add `.env` to your `.gitignore`:

```bash
echo ".env" >> .gitignore
```

---

## Step 4: Test It!

```bash
# Update your Spotify data
node api/update-spotify-data.js
```

This should create/update `spotify-data.json` with your current music.

Now refresh your portfolio and check the "What I'm Listening To" widget in the Now section!

---

## Step 5: Automate Updates (Optional)

### Using GitHub Actions (Recommended)

Create `.github/workflows/update-spotify.yml`:

```yaml
name: Update Spotify Data

on:
  schedule:
    - cron: '0 * * * *'  # Every hour
  workflow_dispatch:

jobs:
  update:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Update Spotify Data
        env:
          SPOTIFY_CLIENT_ID: ${{ secrets.SPOTIFY_CLIENT_ID }}
          SPOTIFY_CLIENT_SECRET: ${{ secrets.SPOTIFY_CLIENT_SECRET }}
          SPOTIFY_REFRESH_TOKEN: ${{ secrets.SPOTIFY_REFRESH_TOKEN }}
        run: node api/update-spotify-data.js

      - name: Commit changes
        run: |
          git config --local user.email "action@github.com"
          git config --local user.name "GitHub Action"
          git add spotify-data.json
          git diff --quiet && git diff --staged --quiet || git commit -m "Update Spotify data"
          git push
```

Then add these secrets in your GitHub repository settings (Settings → Secrets → Actions):
- `SPOTIFY_CLIENT_ID`
- `SPOTIFY_CLIENT_SECRET`
- `SPOTIFY_REFRESH_TOKEN`

---

## Files You Need to Deploy

Make sure these files are deployed to your website:
- ✅ `spotify-auth.html` - Authorization page
- ✅ `spotify-callback.html` - Callback handler
- ✅ `spotify-data.json` - Music data (will be auto-updated)
- ✅ `main.js` - Already updated with Spotify widget code
- ✅ `as7.css` - Already updated with Spotify widget styles

---

## Troubleshooting

**"Invalid redirect URI" error**
- Make sure you added the exact redirect URI to your Spotify app settings
- Check for typos (https vs http, trailing slashes, etc.)

**"Unable to load music data"**
- Check that `spotify-data.json` exists and has valid JSON
- Open browser console for detailed error messages
- Make sure you've run `node api/update-spotify-data.js` at least once

**Token doesn't work**
- Tokens don't expire unless you revoke access in Spotify settings
- If it stops working, just re-authorize to get a new token

---

## Privacy & Security

✅ **Your credentials are safe:**
- Client ID and Secret are only used server-side (in scripts)
- Refresh token is stored in `.env` (not committed to git)
- Only the music data (track names, artists) is public in `spotify-data.json`

❌ **Never commit:**
- `.env` file
- Your refresh token
- Your client secret

---

## What's Next?

Once this is working, you can:
1. Customize the widget appearance in `as7.css`
2. Change update frequency in GitHub Actions
3. Add more tracks to display
4. Link tracks to Spotify URLs

Need help? Check the detailed guides in the `api/` folder!
