import { spotifyApi } from './apiService.js';

export const queueSong = async (songURI: string) => {
	const queueResult = await spotifyApi.addToQueue(songURI);
	console.log(queueResult);
	if (queueResult) return true;
	console.error(queueResult);
	return false;
};
