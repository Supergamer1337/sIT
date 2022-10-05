import { Router } from 'express';
import { searchSong } from '../services/spotifyService.js';

const searchRouter = Router();

searchRouter.get('/song/:query', async (req, res) => {
	const { query } = req.params;

	if (!query) return res.status(400).json({ error: 'No query provided' });

	const results = await searchSong(query);
	res.status(200).json(results);
});

export default searchRouter;
