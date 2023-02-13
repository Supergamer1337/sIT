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

export const setVolume = async (volume: number) => {
	if (volume > 100) volume = 100;
	if (volume < 0) volume = 0;
	await spotifyApi.setVolume(volume);
};

export const shuffle = async (state: boolean) => {
	await spotifyApi.setShuffle(state);
};

export const repeat = async (state: number) => {
	if (state > 2) state = 2;
	if (state < 0) state = 0;
	const loopState: any = ['off', 'track', 'context'];
	await spotifyApi.setRepeat(loopState[state]);
};
