/**
 * Spotify Refresh Token Generator
 *
 * This script helps you get your Spotify refresh token (one-time setup)
 *
 * HOW TO USE:
 *
 * 1. Install dependencies:
 *    npm install express
 *
 * 2. Set your credentials:
 *    - Replace CLIENT_ID with your Spotify app's client ID
 *    - Replace CLIENT_SECRET with your Spotify app's client secret
 *    - Make sure your redirect URI is set to http://localhost:8888/callback in your Spotify app settings
 *
 * 3. Run this script:
 *    node api/get-refresh-token.js
 *
 * 4. Open browser to:
 *    http://localhost:8888/login
 *
 * 5. Authorize the app and copy the refresh token from the page
 *
 * 6. Save the refresh token as an environment variable
 */

const express = require('express');
const app = express();

// REPLACE THESE WITH YOUR SPOTIFY APP CREDENTIALS
const CLIENT_ID = '12323df3c1a34dbdb1dc69b33895e43b';
const CLIENT_SECRET = 'ea94a1d2e66849049260c59750fe1891';
const REDIRECT_URI = 'https://www.nathan-shea.com/spotify-callback';

// Scopes needed to read currently playing and recently played tracks
const SCOPES = 'user-read-currently-playing user-read-recently-played';

// Step 1: Redirect user to Spotify authorization
app.get('/login', (req, res) => {
  const authUrl = `https://accounts.spotify.com/authorize?` +
    `response_type=code&` +
    `client_id=${CLIENT_ID}&` +
    `scope=${encodeURIComponent(SCOPES)}&` +
    `redirect_uri=${encodeURIComponent(REDIRECT_URI)}`;

  res.redirect(authUrl);
});

// Step 2: Handle callback and exchange code for tokens
app.get('/callback', async (req, res) => {
  const code = req.query.code || null;

  if (!code) {
    return res.send('Error: No code provided');
  }

  try {
    const basic = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64');

    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${basic}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        code: code,
        redirect_uri: REDIRECT_URI,
        grant_type: 'authorization_code',
      }),
    });

    const data = await response.json();

    if (data.error) {
      return res.send(`Error: ${data.error_description || data.error}`);
    }

    // Display the refresh token
    res.send(`
      <html>
        <head>
          <title>Spotify Refresh Token</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              max-width: 800px;
              margin: 50px auto;
              padding: 20px;
              background: #f5f5f5;
            }
            .token-box {
              background: white;
              padding: 20px;
              border-radius: 8px;
              box-shadow: 0 2px 4px rgba(0,0,0,0.1);
              margin: 20px 0;
            }
            .token {
              background: #1DB954;
              color: white;
              padding: 15px;
              border-radius: 4px;
              word-break: break-all;
              font-family: monospace;
              font-size: 14px;
            }
            h1 { color: #1DB954; }
            .success { color: #1DB954; font-weight: bold; }
            .instructions {
              background: #fff3cd;
              border: 1px solid #ffc107;
              padding: 15px;
              border-radius: 4px;
              margin-top: 20px;
            }
          </style>
        </head>
        <body>
          <h1>✅ Success!</h1>
          <p class="success">Your Spotify refresh token has been generated.</p>

          <div class="token-box">
            <h3>Refresh Token:</h3>
            <div class="token">${data.refresh_token}</div>
          </div>

          <div class="instructions">
            <h3>Next Steps:</h3>
            <ol>
              <li>Copy the refresh token above</li>
              <li>Add it to your environment variables as <code>SPOTIFY_REFRESH_TOKEN</code></li>
              <li>Also add:
                <ul>
                  <li><code>SPOTIFY_CLIENT_ID=${CLIENT_ID}</code></li>
                  <li><code>SPOTIFY_CLIENT_SECRET=${CLIENT_SECRET}</code></li>
                </ul>
              </li>
              <li>Deploy the <code>api/spotify-now-playing.js</code> function to your serverless platform</li>
              <li>You can now close this window</li>
            </ol>
          </div>
        </body>
      </html>
    `);

  } catch (error) {
    console.error('Error:', error);
    res.send(`Error: ${error.message}`);
  }
});

const PORT = 8888;
app.listen(PORT, () => {
  console.log(`
🎵 Spotify Refresh Token Generator

✅ Server running on http://localhost:${PORT}

📝 Next steps:
1. Make sure you've set CLIENT_ID and CLIENT_SECRET in this file
2. Open http://localhost:${PORT}/login in your browser
3. Authorize the app
4. Copy the refresh token

Press Ctrl+C to stop the server
  `);
});
