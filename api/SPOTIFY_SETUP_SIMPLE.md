# Spotify Setup Guide - Option C (Static JSON)

This is the **simplest approach** that doesn't require a backend server. Your Spotify listening data is fetched periodically and stored in a static JSON file.

## How It Works

1. A script fetches your currently playing or recently played tracks from Spotify
2. The data is saved to `spotify-data.json`
3. Your portfolio reads from this file and displays the music
4. The script runs automatically every hour (or manually when you want to update)

## Benefits of Option C

- ✅ No backend server needed
- ✅ Works with static hosting (Netlify, Vercel, GitHub Pages, etc.)
- ✅ Fast page loads (no API calls on every visit)
- ✅ Free (no serverless function costs)
- ✅ Simple to maintain

## Setup Steps

### 1. Create a Spotify Developer App

1. Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. Log in and click **"Create an App"**
3. Fill in:
   - App name: "Portfolio Music Widget"
   - Description: "Displays my music on my portfolio"
4. Click **"Create"**
5. Copy your **Client ID** and **Client Secret**

### 2. Get Your Refresh Token

1. Open `api/get-refresh-token.js` and update:
   ```javascript
   const CLIENT_ID = 'your_client_id_here';
   const CLIENT_SECRET = 'your_client_secret_here';
   ```

2. In your Spotify app settings, add redirect URI:
   ```
   http://localhost:8888/callback
   ```

3. Install dependencies and run:
   ```bash
   npm install express
   node api/get-refresh-token.js
   ```

4. Open browser to: `http://localhost:8888/login`

5. Authorize the app and copy the **refresh token**

6. Create a `.env` file in your project root:
   ```env
   SPOTIFY_CLIENT_ID=your_client_id
   SPOTIFY_CLIENT_SECRET=your_client_secret
   SPOTIFY_REFRESH_TOKEN=your_refresh_token
   ```

### 3. Test the Update Script

Run the script manually to test:

```bash
node api/update-spotify-data.js
```

This should update `spotify-data.json` with your current or recent music.

### 4. Automate Updates

Choose one of these methods to keep your music data fresh:

#### Option A: GitHub Actions (Recommended)

Create `.github/workflows/update-spotify.yml`:

```yaml
name: Update Spotify Data

on:
  schedule:
    # Run every hour
    - cron: '0 * * * *'
  workflow_dispatch: # Allow manual trigger

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

Then add secrets in your GitHub repo settings:
- `SPOTIFY_CLIENT_ID`
- `SPOTIFY_CLIENT_SECRET`
- `SPOTIFY_REFRESH_TOKEN`

#### Option B: Vercel Cron Jobs

If deploying to Vercel, create `vercel.json`:

```json
{
  "crons": [
    {
      "path": "/api/update-spotify-cron",
      "schedule": "0 * * * *"
    }
  ]
}
```

Create `api/update-spotify-cron.js`:

```javascript
const { updateSpotifyData } = require('./update-spotify-data');

module.exports = async (req, res) => {
  try {
    await updateSpotifyData();
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
```

#### Option C: Manual Updates

Just run the script whenever you want to update:

```bash
node api/update-spotify-data.js
git add spotify-data.json
git commit -m "Update Spotify data"
git push
```

## Customization

### Show Top Tracks Instead

Modify `api/update-spotify-data.js` to fetch top tracks:

```javascript
const TOP_TRACKS_ENDPOINT = 'https://api.spotify.com/v1/me/top/tracks?limit=5&time_range=short_term';
```

### Change Update Frequency

Edit the cron schedule:
- Every hour: `0 * * * *`
- Every 30 minutes: `*/30 * * * *`
- Every day at noon: `0 12 * * *`

### Display Multiple Tracks

Update `main.js` to show all tracks in `recentTracks` array instead of just the first one.

## Testing

1. Play a song on Spotify
2. Run: `node api/update-spotify-data.js`
3. Check `spotify-data.json` - it should have your current track
4. Refresh your portfolio - the widget should show your music!

## Troubleshooting

**"Error updating Spotify data"**
- Check your environment variables are set correctly
- Make sure your refresh token hasn't been revoked
- Verify you have internet connection

**Widget shows placeholder**
- Check that `spotify-data.json` exists and has valid data
- Open browser console for error messages
- Make sure the file is being served (not blocked by .gitignore)

**Data not updating**
- Check GitHub Actions logs (if using GH Actions)
- Verify cron job is running (if using Vercel)
- Make sure git commits are pushing successfully

## Privacy Note

Your `spotify-data.json` file will be public (part of your repository). If you want to keep your listening habits private, you can:

1. Use a serverless function instead (back to Option B)
2. Manually curate tracks instead of auto-updating
3. Only update when you want to share what you're listening to

---

Need help? Check the main [SPOTIFY_SETUP.md](./SPOTIFY_SETUP.md) for more details.
