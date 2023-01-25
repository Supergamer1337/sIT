import { spotifyApi } from './apiService.js';
import { setDevice } from './deviceService.js';
import { searchAlbum, searchArtist, searchSong } from './searchService.js';

export const playSong = async (songName: string) => {
	const results = await searchSong(songName);
	if (results === undefined) return;
	const songURI = results?.body?.tracks?.items[0].uri;
	if (songURI === undefined) return;
	await setDevice(process.env.DEVICE_ID);
	await spotifyApi.play({ uris: [songURI] });
};

export const playAlbum = async (albumName: string) => {
	const results = await searchAlbum(albumName);
	if (results === undefined) return;
	const albumURI = results.body.albums.items[0].uri;
	await setDevice(process.env.DEVICE_ID);
	await spotifyApi.play({ context_uri: albumURI });
	return results;
};

export const playArtist = async (albumName: string) => {
	const results = await searchArtist(albumName);
	if (results === undefined) return;
	const albumURI = results.body.artists.items[0].uri;
	await spotifyApi.setShuffle(true);
	await spotifyApi.play({ context_uri: albumURI });
	//await setDevice(process.env.DEVICE_ID);
	return results;
};
