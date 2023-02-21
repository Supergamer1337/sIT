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
	try {
		await pausePlayback();
	} catch (e) {
		return res.status(500).json({ message: 'Failed to pause playback' });
	}
	res.status(200).json({ message: 'Playback paused' });
});

controlRouter.get('/play', async (req, res) => {
	try {
		await startPlayback();
	} catch (e) {
		return res
			.status(500)
			.json({ message: 'Failed to continue/start playback' });
	}
	res.status(200).json({ message: 'Playback continued' });
});

controlRouter.get('/next', async (req, res) => {
	try {
		await nextSong();
	} catch (e) {
		return res.status(500).json({ message: 'Failed to skip song' });
	}
	res.status(200).json({ message: 'Skipped song' });
});

controlRouter.get('/previous', async (req, res) => {
	try {
		await previousSong();
	} catch (e) {
		return res.status(500).json({ message: 'Failed to play previous' });
	}
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
