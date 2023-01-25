import ErrorHandlingRouter from '../classes/ErrorHandlingRouter.js';
import {
	searchAlbum,
	searchArtist,
	searchPlaylist,
	searchSong
} from '../services/searchService.js';

const searchRouter = new ErrorHandlingRouter();

searchRouter.get('/song/:query', async (req, res) => {
	const { query } = req.params;

	if (!query) return res.status(400).json({ error: 'No query provided' });

	const results = await searchSong(query);
	res.status(200).json(results);
});

searchRouter.get('/artist/:query', async (req, res) => {
	const { query } = req.params;

	if (!query) return res.status(400).json({ error: 'No query provided' });

	const results = await searchArtist(query);
	res.status(200).json(results);
});

searchRouter.get('/album/:query', async (req, res) => {
	const { query } = req.params;

	if (!query) return res.status(400).json({ error: 'No query provided' });

	const results = await searchAlbum(query);
	res.status(200).json(results);
});

searchRouter.get('/playlist/:query', async (req, res) => {
	const { query } = req.params;

	if (!query) return res.status(400).json({ error: 'No query provided' });

	const results = await searchPlaylist(query);
	res.status(200).json(results);
});

//Should add for playlists, artists, and albums too
export default searchRouter;
