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

export const getPlayStatus = async () => {
	const statusUnformatted = await spotifyApi.getMyCurrentPlaybackState();
	if (!statusUnformatted) return false;
	return {
		name: statusUnformatted.body.item?.name,
		artist: statusUnformatted.body.item?.artists.map(
			(artist: any) => artist.name
		),
		album: statusUnformatted.body.item?.album.name,
		time: {
			current: statusUnformatted.body.progress_ms,
			total: statusUnformatted.body.item?.duration_ms
		},
		controls: {
			isPlaying: statusUnformatted.body.is_playing,
			isShuffle: statusUnformatted.body.shuffle_state,
			isRepeat: statusUnformatted.body.repeat_state
		}
	};
};