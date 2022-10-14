import { spotifyApi } from './apiService';

export const getDevices = async () => {
	return spotifyApi.getMyDevices();
};

export const setDevice = async (deviceID: string) => {
	try {
		await spotifyApi.transferMyPlayback([deviceID]);
	} catch (error) {
		console.error(error);
	}
};
