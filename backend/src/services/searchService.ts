import { spotifyApi } from './apiService.js';

export const searchSong = async (songName: string) => {
	return spotifyApi.searchTracks(songName);
};
export const searchAlbum = async (albumName: string) => {
	return spotifyApi.searchAlbums(albumName);
};
export const searchArtist = async (artistName: string) => {
	return spotifyApi.searchArtists(artistName);
};
export const searchPlaylist = async (playlistName: string) => {
	return spotifyApi.searchPlaylists(playlistName);
};
