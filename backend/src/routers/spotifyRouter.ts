import { Router } from 'express';
import { handleSpotifyCallback } from '../services/spotifyService.js';

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

export default spotifyRouter;
