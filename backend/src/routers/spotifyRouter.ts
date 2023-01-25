import ErrorHandlingRouter from '../classes/ErrorHandlingRouter.js';
import { handleSpotifyCallback } from '../services/authService.js';
import { playSong } from '../services/playService.js';

const spotifyRouter = new ErrorHandlingRouter();

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
	playSong('crab rave');
	res.status(200).json({ message: 'Now playing: crab rave' });
});

export default spotifyRouter;
