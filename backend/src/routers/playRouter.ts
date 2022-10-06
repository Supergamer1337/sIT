import { Router } from 'express';
import { playSong } from '../services/spotifyService.js';

const playRouter = Router();

playRouter.get('/song/:songName', async (req, res) => {
	const { songName } = req.params;
	const deviceID = await playSong(songName);
	res.send(deviceID);
});

export default playRouter;
