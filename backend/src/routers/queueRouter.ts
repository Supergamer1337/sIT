import ErrorHandlingRouter from '../classes/ErrorHandlingRouter.js';
import { queueSong } from '../services/queueService.js';

const queueRouter = new ErrorHandlingRouter();

queueRouter.post('/song', async (req, res) => {
	let { songURI } = req.body;
	if (!songURI) {
		console.log('No song URI provided');
		return res.status(400).json({ errors: ['No song URI provided'] });
	}

	const results = await queueSong(songURI);
	if (!results)
		return res.status(400).json({ errors: ['Could not queue song'] });
	res.status(200).json(results);
});

export default queueRouter;
