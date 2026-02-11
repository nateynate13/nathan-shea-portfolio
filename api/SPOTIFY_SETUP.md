# Spotify Integration Setup Guide

This guide will help you set up the "What I'm Listening To" widget on your portfolio.

## Overview

The widget displays:
- **Currently playing track** (if you're listening right now)
- **Recently played track** (if nothing is currently playing)
- Album art, track name, artist, and album information

## Prerequisites

- A Spotify account (free or premium)
- A Spotify Developer account
- A serverless deployment platform (Vercel, Netlify, etc.)

---

## Step 1: Create a Spotify Developer App

1. Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. Log in with your Spotify account
3. Click **"Create an App"**
4. Fill in the details:
   - **App name**: "Portfolio Music Widget" (or any name you like)
   - **App description**: "Displays currently playing music on my portfolio"
   - **Website**: Your portfolio URL
   - **Redirect URI**: `http://localhost:8888/callback` (for now)
5. Click **"Create"**
6. Copy your **Client ID** and **Client Secret** (click "Show Client Secret")

---

## Step 2: Get Your Refresh Token

### Option A: Using the provided script (Recommended)

1. Install Node.js if you haven't already

2. Install dependencies:
   ```bash
   npm install express
   ```

3. Edit `api/get-refresh-token.js`:
   - Replace `CLIENT_ID` with your Spotify Client ID
   - Replace `CLIENT_SECRET` with your Spotify Client Secret

4. Run the script:
   ```bash
   node api/get-refresh-token.js
   ```

5. Open your browser to: `http://localhost:8888/login`

6. Authorize the app when prompted by Spotify

7. Copy the **refresh token** displayed on the page

8. Stop the server (Ctrl+C)

### Option B: Manual Authorization Flow

If you prefer to do it manually, follow the [Spotify Authorization Guide](https://developer.spotify.com/documentation/general/guides/authorization/code-flow/).

---

## Step 3: Deploy the Serverless Function

### For Vercel:

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Create a `vercel.json` in your project root:
   ```json
   {
     "functions": {
       "api/spotify-now-playing.js": {
         "memory": 128,
         "maxDuration": 10
       }
     }
   }
   ```

3. Add environment variables in Vercel dashboard:
   - `SPOTIFY_CLIENT_ID`: Your Spotify Client ID
   - `SPOTIFY_CLIENT_SECRET`: Your Spotify Client Secret
   - `SPOTIFY_REFRESH_TOKEN`: Your refresh token from Step 2

4. Deploy:
   ```bash
   vercel
   ```

### For Netlify:

1. Install Netlify CLI:
   ```bash
   npm install -g netlify-cli
   ```

2. Create a `netlify.toml` in your project root:
   ```toml
   [functions]
     directory = "api"
   ```

3. Rename `api/spotify-now-playing.js` to `api/spotify-now-playing/spotify-now-playing.js`

4. Add environment variables in Netlify dashboard:
   - `SPOTIFY_CLIENT_ID`
   - `SPOTIFY_CLIENT_SECRET`
   - `SPOTIFY_REFRESH_TOKEN`

5. Deploy:
   ```bash
   netlify deploy --prod
   ```

---

## Step 4: Update Your Frontend

Your frontend code is already set up! It will automatically call `/api/spotify-now-playing` when the Now section loads.

If your API endpoint is at a different URL (e.g., `https://your-backend.com/api/spotify`), update the fetch URL in `main.js`:

```javascript
// In the loadSpotifyData() function
const response = await fetch('https://your-backend.com/api/spotify-now-playing');
```

---

## Testing

1. Start playing a song on Spotify
2. Refresh your portfolio page
3. The widget should show your currently playing track with:
   - Album art
   - Track name
   - Artist name
   - Album name
   - "Now Playing" badge with animated pulse indicator

If nothing is playing, it will show your most recently played track with a "Recently Played" badge.

---

## Troubleshooting

### "Unable to load music data" error

- Check that your environment variables are set correctly
- Verify your serverless function is deployed
- Check the browser console for detailed error messages
- Make sure your refresh token hasn't expired (they don't expire unless you revoke access)

### Refresh token stops working

If you revoke access to the app in your Spotify account settings, you'll need to generate a new refresh token by repeating Step 2.

### CORS errors

Make sure your serverless function has CORS headers enabled (already included in the template).

---

## Rate Limits

Spotify API has rate limits:
- **Regular**: 10,000 requests per day per app
- The widget makes 1 request per page load

This should be more than enough for a personal portfolio.

---

## Privacy Note

The refresh token allows the app to access your Spotify data. Keep it secure:
- ✅ Store it as an environment variable
- ✅ Never commit it to git
- ❌ Don't share it publicly
- ❌ Don't hardcode it in your frontend

---

## Optional Enhancements

Want to improve the widget? Here are some ideas:

1. **Add a link to the track**: Make the album art clickable to open in Spotify
2. **Show playback progress**: Add a progress bar for currently playing tracks
3. **Display top tracks**: Show your top 5 tracks instead of just current/recent
4. **Add a "Listen on Spotify" button**: Deep link to the track
5. **Cache results**: Reduce API calls by caching for 30 seconds

Let me know if you want help implementing any of these!
