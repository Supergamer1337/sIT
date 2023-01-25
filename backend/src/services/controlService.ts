import { spotifyApi } from './apiService.js';

export const pausePlayback = async () => {
	await spotifyApi.pause();
};

export const startPlayback = async () => {
	await spotifyApi.play();
};

export const nextSong = async () => {
	await spotifyApi.skipToNext();
};

export const previousSong = async () => {
	await spotifyApi.skipToPrevious();
};
