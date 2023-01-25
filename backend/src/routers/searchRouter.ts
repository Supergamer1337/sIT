import { Router } from 'express';
import { searchSong } from '../services/searchService.js';

const searchRouter = Router();

searchRouter.get('/song/:query', async (req, res) => {
	const { query } = req.params;

	if (!query) return res.status(400).json({ error: 'No query provided' });

	const results = await searchSong(query);
	res.status(200).json(results);
});

//Should add for playlists, artists, and albums too
export default searchRouter;
