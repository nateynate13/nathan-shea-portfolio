/**
 * Spotify API Integration - Now Playing Endpoint
 *
 * This is a template for a serverless function (works with Vercel, Netlify, etc.)
 *
 * SETUP INSTRUCTIONS:
 *
 * 1. Create a Spotify Developer App:
 *    - Go to https://developer.spotify.com/dashboard
 *    - Create an app and get your Client ID and Client Secret
 *    - Add redirect URI (e.g., http://localhost:3000/callback)
 *
 * 2. Get your Refresh Token (one-time setup):
 *    - Use the authorization code flow to get a refresh token
 *    - See: https://developer.spotify.com/documentation/general/guides/authorization/code-flow/
 *
 * 3. Set Environment Variables:
 *    - SPOTIFY_CLIENT_ID=your_client_id
 *    - SPOTIFY_CLIENT_SECRET=your_client_secret
 *    - SPOTIFY_REFRESH_TOKEN=your_refresh_token
 *
 * 4. Deploy this function to your serverless platform
 */

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const REFRESH_TOKEN = process.env.SPOTIFY_REFRESH_TOKEN;

const NOW_PLAYING_ENDPOINT = 'https://api.spotify.com/v1/me/player/currently-playing';
const RECENTLY_PLAYED_ENDPOINT = 'https://api.spotify.com/v1/me/player/recently-played?limit=1';
const TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token';

async function getAccessToken() {
  const basic = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64');

  const response = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: REFRESH_TOKEN,
    }),
  });

  return response.json();
}

async function getNowPlaying(accessToken) {
  return fetch(NOW_PLAYING_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
}

async function getRecentlyPlayed(accessToken) {
  return fetch(RECENTLY_PLAYED_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
}

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    const { access_token } = await getAccessToken();

    // Try to get currently playing track
    const nowPlayingResponse = await getNowPlaying(access_token);

    if (nowPlayingResponse.status === 204 || nowPlayingResponse.status > 400) {
      // Nothing currently playing, get recently played
      const recentlyPlayedResponse = await getRecentlyPlayed(access_token);

      if (recentlyPlayedResponse.status === 200) {
        const recentData = await recentlyPlayedResponse.json();
        const track = recentData.items[0]?.track;

        if (track) {
          return res.status(200).json({
            isPlaying: false,
            recentTrack: {
              trackName: track.name,
              artist: track.artists.map((artist) => artist.name).join(', '),
              album: track.album.name,
              albumArt: track.album.images[0]?.url || '',
              spotifyUrl: track.external_urls.spotify,
            },
          });
        }
      }

      return res.status(200).json({ isPlaying: false });
    }

    if (nowPlayingResponse.status === 200) {
      const nowPlayingData = await nowPlayingResponse.json();
      const track = nowPlayingData.item;

      return res.status(200).json({
        isPlaying: nowPlayingData.is_playing,
        trackName: track.name,
        artist: track.artists.map((artist) => artist.name).join(', '),
        album: track.album.name,
        albumArt: track.album.images[0]?.url || '',
        spotifyUrl: track.external_urls.spotify,
      });
    }

    return res.status(200).json({ isPlaying: false });
  } catch (error) {
    console.error('Error fetching Spotify data:', error);
    return res.status(500).json({ error: 'Failed to fetch Spotify data' });
  }
}
