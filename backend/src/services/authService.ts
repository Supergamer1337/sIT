import fs from 'fs';
import { setInterval } from 'timers/promises';
import { spotifyApi } from './apiService.js';

/*
  * Scopes available
    Images
        ugc-image-upload
    Spotify Connect
        user-read-playback-state
        user-modify-playback-state
        user-read-currently-playing
    Playback
        app-remote-control
        streaming
    Playlists
        playlist-read-private
        playlist-read-collaborative
        playlist-modify-private
        playlist-modify-public
    Follow
        user-follow-modify
        user-follow-read
    Listening History
        user-read-playback-position
        user-top-read
        user-read-recently-played
    Library
        user-library-modify
        user-library-read
    Users
        user-read-email
        user-read-private
*/

const scopes = [
	'user-read-playback-state',
	'user-modify-playback-state',
	'user-read-currently-playing',
	'app-remote-control'
];

export const readSpotifyAuth = async () => {
	if (fs.existsSync('token.json')) {
		const auth = fs.readFileSync('token.json');
		const authJson = JSON.parse(auth.toString());
		if (authJson.expires_in + authJson.timestamp < Date.now())
			return setAccessAndRefreshTokens(
				authJson.access_token,
				authJson.refresh_token
			);
	}
	console.log('No token found.');
	console.log(`Authorize the app using:\n${getSpotifyAuthString()}`);
};

export const handleSpotifyCallback = async (code: string) => {
	const data = await spotifyApi.authorizationCodeGrant(code);
	if (data.statusCode == 200) {
		setAccessAndRefreshTokens(data.body.access_token, data.body.refresh_token);
		fs.writeFileSync(
			'token.json',
			JSON.stringify({ ...data.body, timestamp: Date.now() })
		);
		return;
	}
	console.error(data.statusCode, data.body);
	throw new Error('Failed to get access token');
};

const getSpotifyAuthString = () => {
	if (
		!process.env.SPOTIFY_CLIENT_ID ||
		!process.env.SPOTIFY_CLIENT_SECRET ||
		!process.env.SPOTIFY_REDIRECT_URI
	)
		throw new Error('No spotify app credentials provided');

	spotifyApi.setClientId(process.env.SPOTIFY_CLIENT_ID);
	spotifyApi.setClientSecret(process.env.SPOTIFY_CLIENT_SECRET);
	spotifyApi.setRedirectURI(process.env.SPOTIFY_REDIRECT_URI);
	return spotifyApi.createAuthorizeURL(scopes, 'aaaaaaaaaaaaaah!'); // TODO: generate random state
};

const setAccessAndRefreshTokens = async (
	access_token: string,
	refresh_token: string
) => {
	spotifyApi.setAccessToken(access_token);
	spotifyApi.setRefreshToken(refresh_token);

	periodicallyRefreshAccessToken();
};

const periodicallyRefreshAccessToken = async () => {
	const MAX_TRIES = 4;
	const HOUR = 1000 * 60 * 60;
	const OFFSET = 1000 * 10; // 10 seconds offset in case of network latency
	const INTERVAL_TIME = HOUR / MAX_TRIES - OFFSET;

	let tries = 0;
	setInterval(INTERVAL_TIME, async () => {
		tries = await refreshAccessToken(tries);
		if (tries >= MAX_TRIES) {
			process.exit(1);
		}
	});
};

const refreshAccessToken = async (prevTries: number) => {
	const data = await spotifyApi.refreshAccessToken();

	if (data.statusCode == 200) {
		spotifyApi.setAccessToken(data.body.access_token);

		if (data.body.refresh_token) {
			spotifyApi.setRefreshToken(data.body.refresh_token);
		} else {
			console.warn("Couldn't set new refresh token");
		}

		fs.writeFileSync(
			'token.json',
			JSON.stringify({ ...data.body, timestamp: Date.now() })
		);

		return 0;
	}

	console.error("Couldn't refresh access token", data.statusCode, data.body);
	return prevTries + 1;
};
