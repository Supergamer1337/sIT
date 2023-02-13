import ErrorHandlingRouter from '../classes/ErrorHandlingRouter.js';
import {
	nextSong,
	pausePlayback,
	previousSong,
	setVolume,
	startPlayback,
	shuffle,
	repeat
} from '../services/controlService.js';

const controlRouter = new ErrorHandlingRouter();

controlRouter.get('/pause', async (req, res) => {
	pausePlayback();
	res.status(200).json({ message: 'Playback paused' });
});

controlRouter.get('/play', async (req, res) => {
	startPlayback();
	res.status(200).json({ message: 'Playback continued' });
});

controlRouter.get('/next', async (req, res) => {
	nextSong();
	res.status(200).json({ message: 'Skipped song' });
});

controlRouter.get('/previous', async (req, res) => {
	previousSong();
	res.status(200).json({ message: 'Repeat previous' });
});

controlRouter.post('/volume', async (req, res) => {
	const { volume } = req.body;
	if (volume === undefined)
		return res.status(400).json({ message: 'Volume not specified' });
	if (typeof volume != 'number')
		return res.status(400).json({ message: 'Volume needs to be a number' });

	setVolume(volume);
	res.status(200).json({ message: 'Volume set to ' + volume });
});

controlRouter.post('/shuffle', async (req, res) => {
	const { state } = req.body;
	if (state === undefined)
		return res.status(400).json({ message: 'State not specified' });
	if (typeof state != 'boolean')
		return res.status(400).json({ message: 'State needs to be a boolean' });
	shuffle(state);
	res.status(200).json({ message: `Shuffle set to ${state ? 'on' : 'off'}` });
});
controlRouter.post('/repeat', async (req, res) => {
	const { state } = req.body;
	if (state === undefined)
		return res.status(400).json({ message: 'State not specified' });
	if (typeof state != 'number')
		return res.status(400).json({ message: 'State needs to be a number' });
	repeat(state);
	res
		.status(200)
		.json({
			message: `Repeat set to ${
				state == 0 ? 'off' : state == 1 ? 'track' : 'context'
			}`
		});
});

export default controlRouter;
