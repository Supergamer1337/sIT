import { spotifyApi } from './apiService.js';

export const searchSong = async (songName: string, amount: number) => {
	amount = amountCheck(amount);

	const songResult = await spotifyApi.searchTracks(songName, {
		limit: amount,
		market: 'se'
	});
	const tracks = songResult?.body?.tracks?.items;
	if (tracks == undefined) return [];

	return tracks.map((song) => ({
		name: song.name,
		uri: song.uri
	}));
};

export const searchAlbum = async (albumName: string, amount: number) => {
	amount = amountCheck(amount);
	const albumResult = await spotifyApi.searchAlbums(albumName, {
		limit: amount,
		market: 'se'
	});

	const albums = albumResult?.body?.albums?.items;
	if (albums == undefined) return [];

	return albums.map((album) => ({
		name: album.name,
		uri: album.uri
	}));
};

export const searchArtist = async (artistName: string, amount: number) => {
	amount = amountCheck(amount);

	const artistResult = await spotifyApi.searchArtists(artistName, {
		limit: amount,
		market: 'se'
	});
	const artists = artistResult?.body?.artists?.items;
	if (artists == undefined) return [];

	return artists.map((artist) => ({
		name: artist.name,
		uri: artist.uri
	}));
};

export const searchPlaylist = async (playlistName: string, amount: number) => {
	amount = amountCheck(amount);

	const playlistResult = await spotifyApi.searchPlaylists(playlistName, {
		limit: amount,
		market: 'se'
	});

	const playlists = playlistResult?.body?.playlists?.items;
	if (playlists == undefined) return [];

	return playlists.map((playlist) => ({
		name: playlist.name,
		uri: playlist.uri
	}));
};

const amountCheck = (amount: number) => {
	if (amount < 1) amount = 1;
	if (amount > 50) amount = 50;
	return amount;
};
