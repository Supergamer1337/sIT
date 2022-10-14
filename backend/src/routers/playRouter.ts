import { Router } from 'express';
import { playAlbum, playArtist, playSong } from '../services/playService.js';

const playRouter = Router();

playRouter.get('/song/:songName', async (req, res) => {
	const { songName } = req.params;
	await playSong(songName);
	res.send('Now playing: ' + songName);
});

playRouter.get('/album/:albumName', async (req, res) => {
	const { albumName } = req.params;
	const album = await playAlbum(albumName);
	res.status(200).json(album);
});

playRouter.get('/artist/:artistName', async (req, res) => {
	const { artistName } = req.params;
	const artist = await playArtist(artistName);
	res.status(200).json(artist);
});
export default playRouter;
