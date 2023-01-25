import { Router } from 'express';
import {
	nextSong,
	pausePlayback,
	previousSong,
	setVolume,
	startPlayback
} from '../services/controlService.js';

const controlRouter = Router();

controlRouter.get('/pause', async (req, res) => {
	try {
		pausePlayback();
		res.status(200).json({ message: 'Playback paused' });
	} catch (error) {
		res.status(500).json({ message: 'Failed to pause playback' });
	}
});

controlRouter.get('/play', async (req, res) => {
	try {
		startPlayback();
		res.status(200).json({ message: 'Playback continued' });
	} catch (error) {
		res.status(500).json({ message: 'Failed to continue playback' });
	}
});

controlRouter.get('/next', async (req, res) => {
	try {
		nextSong();
		res.status(200).json({ message: 'Skipped song' });
	} catch (error) {
		res.status(500).json({ message: 'Failed to skip song' });
	}
});

controlRouter.get('/previous', async (req, res) => {
	try {
		previousSong();
		res.status(200).json({ message: 'Repeat previous' });
	} catch (error) {
		res.status(500).json({ message: 'Failed to skip to previous song' });
	}
});

controlRouter.post('/volume', async (req, res) => {
	const { volume } = req.body;
	if (volume === undefined)
		return res.status(400).json({ message: 'Volume not specified' });
	if (typeof volume != 'number')
		return res.status(400).json({ message: 'Volume needs to be a number' });
	try {
		setVolume(volume);
		res.status(200).json({ message: 'Volume set to ' + volume });
	} catch (error) {
		res.status(500).json({ message: 'Failed to set volume' });
	}
});

export default controlRouter;
