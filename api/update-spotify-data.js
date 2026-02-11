#!/usr/bin/env node

/**
 * Spotify Data Updater - Option C (Static JSON)
 *
 * This script fetches your currently playing or recently played tracks
 * and updates spotify-data.json with the latest information.
 *
 * SETUP:
 * 1. Follow steps in SPOTIFY_SETUP_SIMPLE.md to get your credentials
 * 2. Set environment variables:
 *    - SPOTIFY_CLIENT_ID
 *    - SPOTIFY_CLIENT_SECRET
 *    - SPOTIFY_REFRESH_TOKEN
 * 3. Run this script manually or via cron job:
 *    node api/update-spotify-data.js
 *
 * AUTOMATION OPTIONS:
 * - GitHub Actions: Run every hour to update the JSON file
 * - Cron job: Schedule on your server
 * - Vercel Cron: Use Vercel's cron jobs feature
 */

const fs = require('fs');
const path = require('path');

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const REFRESH_TOKEN = process.env.SPOTIFY_REFRESH_TOKEN;

const NOW_PLAYING_ENDPOINT = 'https://api.spotify.com/v1/me/player/currently-playing';
const RECENTLY_PLAYED_ENDPOINT = 'https://api.spotify.com/v1/me/player/recently-played?limit=5';
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

  const data = await response.json();
  return data.access_token;
}

async function getNowPlaying(accessToken) {
  const response = await fetch(NOW_PLAYING_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (response.status === 200) {
    return await response.json();
  }

  return null;
}

async function getRecentlyPlayed(accessToken) {
  const response = await fetch(RECENTLY_PLAYED_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (response.status === 200) {
    return await response.json();
  }

  return null;
}

async function updateSpotifyData() {
  try {
    console.log('🎵 Fetching Spotify data...');

    const accessToken = await getAccessToken();
    const nowPlaying = await getNowPlaying(accessToken);
    const recentlyPlayed = await getRecentlyPlayed(accessToken);

    const data = {
      currentTrack: null,
      recentTracks: [],
      lastUpdated: new Date().toISOString(),
    };

    // If currently playing, add it
    if (nowPlaying && nowPlaying.item) {
      data.currentTrack = {
        trackName: nowPlaying.item.name,
        artist: nowPlaying.item.artists.map(a => a.name).join(', '),
        album: nowPlaying.item.album.name,
        albumArt: nowPlaying.item.album.images[0]?.url || '',
        spotifyUrl: nowPlaying.item.external_urls.spotify,
        isPlaying: nowPlaying.is_playing,
      };
      console.log('✅ Currently playing:', data.currentTrack.trackName);
    }

    // Add recently played tracks
    if (recentlyPlayed && recentlyPlayed.items) {
      data.recentTracks = recentlyPlayed.items.map(item => ({
        trackName: item.track.name,
        artist: item.track.artists.map(a => a.name).join(', '),
        album: item.track.album.name,
        albumArt: item.track.album.images[0]?.url || '',
        spotifyUrl: item.track.external_urls.spotify,
        playedAt: item.played_at,
      }));
      console.log(`✅ Fetched ${data.recentTracks.length} recently played tracks`);
    }

    // Write to file
    const outputPath = path.join(__dirname, '..', 'spotify-data.json');
    fs.writeFileSync(outputPath, JSON.stringify(data, null, 2));
    console.log('✅ Updated spotify-data.json');

    return data;
  } catch (error) {
    console.error('❌ Error updating Spotify data:', error);
    throw error;
  }
}

// Run if called directly
if (require.main === module) {
  updateSpotifyData()
    .then(() => {
      console.log('✨ Done!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('Failed:', error);
      process.exit(1);
    });
}

module.exports = { updateSpotifyData };
