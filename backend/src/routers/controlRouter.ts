import { Router } from 'express';
import {
	nextSong,
	pausePlayback,
	previousSong,
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

export default controlRouter;
