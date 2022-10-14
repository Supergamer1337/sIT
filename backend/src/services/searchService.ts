import { spotifyApi } from './apiService';

export const searchSong = async (songName: string) => {
	return spotifyApi.searchTracks(songName);
};
export const searchAlbum = async (albumName: string) => {
	return spotifyApi.searchAlbums(albumName);
};
export const searchArtist = async (artistName: string) => {
	return spotifyApi.searchArtists(artistName);
};
