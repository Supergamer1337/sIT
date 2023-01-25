import ErrorHandlingRouter from '../classes/ErrorHandlingRouter.js';
import {
	nextSong,
	pausePlayback,
	previousSong,
	setVolume,
	startPlayback
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

export default controlRouter;
