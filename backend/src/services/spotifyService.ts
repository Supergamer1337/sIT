import SpotifyWebApi from 'spotify-web-api-node';
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

const spotifyApi = new SpotifyWebApi();

export const searchSong = async (songName: string) => {
	return await spotifyApi.searchTracks(songName);
};
export const searchAlbum = async (albumName: string) => {
	return await spotifyApi.searchAlbums(albumName);
};
export const searchArtist = async (artistName: string) => {
	return await spotifyApi.searchArtists(artistName);
};

export const setAccessToken = (accessToken: string) => {
	spotifyApi.setAccessToken(accessToken);
};

export const readSpotifyAuth = async () => {
	if (fs.existsSync('token.json')) {
		const auth = await fs.readFileSync('token.json');
		const authJson = JSON.parse(auth.toString());
		setAccessAndRefreshTokens(authJson.access_token, authJson.refresh_token);
	} else {
		console.log('No token found.');
		console.log(`Authorize the app using:\n${getSpotifyAuthString()}`);
	}
};

export const handleSpotifyCallback = async (code: string) => {
	const data = await spotifyApi.authorizationCodeGrant(code);
	if (data.statusCode == 200) {
		setAccessAndRefreshTokens(data.body.access_token, data.body.refresh_token);
		fs.writeFileSync('token.json', JSON.stringify(data.body));
		return;
	}
	console.error(data.statusCode, data.body);
	throw new Error('Failed to get access token');
};

const setAccessAndRefreshTokens = async (
	access_token: string,
	refresh_token: string
) => {
	spotifyApi.setAccessToken(access_token);
	spotifyApi.setRefreshToken(refresh_token);
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

export const getDevices = async () => {
	return await spotifyApi.getMyDevices();
};
const setDevice = async () => {
	let deviceID: string | null = '';
	await getDevices().then((devices) => {
		deviceID = devices.body.devices[0].id;
	});
	if (!deviceID) return;
	await spotifyApi.transferMyPlayback([deviceID]);
};

export const playSong = async (songName: string) => {
	const results = await searchSong(songName);
	if (results === undefined) return;
	const songURI = results.body.tracks.items[0].uri;
	await spotifyApi.play({ uris: [songURI] });
	await setDevice();
};

export const playAlbum = async (albumName: string) => {
	const results = await searchAlbum(albumName);
	if (results === undefined) return;
	const albumURI = results.body.albums.items[0].uri;
	await spotifyApi.play({ context_uri: albumURI });
	await setDevice();
	return results;
};

export const playArtist = async (albumName: string) => {
	const results = await searchArtist(albumName);
	if (results === undefined) return;
	const albumURI = results.body.artists.items[0].uri;
	await spotifyApi.setShuffle(true);
	await spotifyApi.play({ context_uri: albumURI });
	//await setDevice();
	return results;
};