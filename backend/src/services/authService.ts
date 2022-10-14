import { spotifyApi } from './apiService';
import fs from 'fs';

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
	return spotifyApi.createAuthorizeURL(scopes, 'aaaaaaaaaaaaaah!');
};

const setAccessAndRefreshTokens = async (
	access_token: string,
	refresh_token: string
) => {
	spotifyApi.setAccessToken(access_token);
	spotifyApi.setRefreshToken(refresh_token);
};
