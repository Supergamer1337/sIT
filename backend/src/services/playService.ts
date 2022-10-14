import SpotifyWebApi from 'spotify-web-api-node';
import fs from 'fs';
import { setDevice } from './deviceService';
import { spotifyApi } from './apiService';
import dotenv from 'dotenv';
import { searchAlbum, searchArtist, searchSong } from './searchService';

dotenv.config();

export const playSong = async (songName: string) => {
	const results = await searchSong(songName);
	if (results === undefined) return;
	const songURI = results?.body?.tracks?.items[0].uri;
	if (songURI === undefined) return;
	await spotifyApi.play({ uris: [songURI] });
	await setDevice(process.env.DEVICE_ID);
};

export const playAlbum = async (albumName: string) => {
	const results = await searchAlbum(albumName);
	if (results === undefined) return;
	const albumURI = results.body.albums.items[0].uri;
	await spotifyApi.play({ context_uri: albumURI });
	await setDevice(process.env.DEVICE_ID);
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
