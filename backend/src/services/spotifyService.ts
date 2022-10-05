import SpotifyWebApi from 'spotify-web-api-node';

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

export const searchSong = (songName: string) => {
	spotifyApi.createAuthorizeURL(scopes, 'aaaaaaaaaaaaaah!');

	return spotifyApi.searchTracks(songName).then(
		(data) => {
			console.log(data);
		},
		(err) => {
			console.error(err);
		}
	);
};

export const setAccessToken = (accessToken: string) => {
	spotifyApi.setAccessToken(accessToken);
};

export const getSpotifyAuthString = () => {
	spotifyApi.setClientId(process.env.SPOTIFY_CLIENT_ID);
	spotifyApi.setClientSecret(process.env.SPOTIFY_CLIENT_SECRET);
	spotifyApi.setRedirectURI(process.env.SPOTIFY_REDIRECT_URI);
	return spotifyApi.createAuthorizeURL(scopes, 'aaaaaaaaaaaaaah!');
};

export const handleSpotifyCallback = async (code: string) => {
	const data = await spotifyApi.authorizationCodeGrant(code);
	if (data.statusCode == 200) {
		spotifyApi.setAccessToken(data.body.access_token);
		spotifyApi.setRefreshToken(data.body.refresh_token);
		return;
	}
	console.error(data.statusCode, data.body);
	throw new Error('Failed to get access token');
};
