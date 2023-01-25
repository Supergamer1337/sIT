import { spotifyApi } from './apiService.js';

export const playSong = async (songURI: string) => {
	await spotifyApi.play({ uris: [songURI] });
};

export const playAlbum = async (albumURI: string) => {
	await spotifyApi.play({ context_uri: albumURI });
};

export const playArtist = async (albumURI: string) => {
	await spotifyApi.play({ context_uri: albumURI });
};

export const playPlaylist = async (playlistURI: string) => {
	await spotifyApi.play({ context_uri: playlistURI });
};
