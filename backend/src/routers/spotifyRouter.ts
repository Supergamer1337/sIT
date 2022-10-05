import { Router } from 'express';
import {
	handleSpotifyCallback,
	searchSong
} from '../services/spotifyService.js';

const spotifyRouter = Router();

spotifyRouter.get('/callback', async (req, res) => {
	try {
		await handleSpotifyCallback(req.query.code as string);
		res.send('Authorized!');
	} catch (error) {
		console.error(error);
		res.status(500).send('Failed to get access token');
	}
});

spotifyRouter.get('/crab', async (req, res) => {
	const rave = await searchSong('crab rave');
	res.status(200).json(rave);
});

export default spotifyRouter;
