import ErrorHandlingRouter from '../classes/ErrorHandlingRouter.js';
import {
	searchAlbum,
	searchArtist,
	searchPlaylist,
	searchSong
} from '../services/searchService.js';

const searchRouter = new ErrorHandlingRouter();

searchRouter.post('/song', async (req, res) => {
	let { name, amount } = req.body;

	const errors = validateNameAndAmount(name, amount);
	if (errors.length > 0) return res.status(400).json({ errors });

	const results = await searchSong(name, amount);
	res.status(200).json(results);
});

searchRouter.get('/artist', async (req, res) => {
	let { name, amount } = req.body;

	const errors = validateNameAndAmount(name, amount);
	if (errors.length > 0) return res.status(400).json({ errors });

	const results = await searchArtist(name, amount);
	res.status(200).json(results);
});

searchRouter.get('/album', async (req, res) => {
	let { name, amount } = req.body;

	const errors = validateNameAndAmount(name, amount);
	if (errors.length > 0) return res.status(400).json({ errors });

	const results = await searchAlbum(name, amount);
	res.status(200).json(results);
});

searchRouter.get('/playlist', async (req, res) => {
	let { name, amount } = req.body;

	const errors = validateNameAndAmount(name, amount);
	if (errors.length > 0) return res.status(400).json({ errors });

	const results = await searchPlaylist(name, amount);
	res.status(200).json(results);
});

const validateNameAndAmount = (name: string, amount: number) => {
	const errors = [];

	if (!name) errors.push('No name provided');
	if (!amount) errors.push('Amount not provided');

	if (typeof amount !== 'number') errors.push('Amount must be a number');
	if (typeof name !== 'string') errors.push('Name must be a string');

	return errors;
};

//Should add for playlists, artists, and albums too
export default searchRouter;
