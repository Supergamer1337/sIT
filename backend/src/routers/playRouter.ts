import ErrorHandlingRouter from '../classes/ErrorHandlingRouter.js';
import {
	getPlayStatus,
	playAlbum,
	playArtist,
	playPlaylist,
	playSong
} from '../services/playService.js';
import { emitEvent } from '../services/websocketService.js';

const playRouter = new ErrorHandlingRouter();

playRouter.post('/song', async (req, res) => {
	const { songURI } = req.body;

	if (!songURI || typeof songURI !== 'string')
		return res.status(400).json({ errors: ['No song URI provided'] });

	await playSong(songURI);

	// This is really bad, but it's the only way (without a lot of work) to get the playback state to update
	// on the client side. Otherwise a race condition occurs where the client gets the same playback state twice
	setTimeout(async () => {
		const playStatus = await getPlayStatus();
		// @ts-ignore
		if (playStatus) emitEvent('update-playback-state', playStatus);
	}, 1);

	res.status(200).json({ message: 'Sent command to play song' });
});

playRouter.post('/album', async (req, res) => {
	const { albumURI } = req.body;

	if (!albumURI || typeof albumURI !== 'string')
		return res.status(400).json({ errors: ['No album URI provided'] });

	await playAlbum(albumURI);
	res.status(200).json({ message: 'Sent command to play album' });
});

playRouter.post('/artist', async (req, res) => {
	const { artistURI } = req.body;

	if (!artistURI || typeof artistURI !== 'string')
		return res.status(400).json({ errors: ['No artist URI provided'] });

	await playArtist(artistURI);
	res.status(200).json({ message: 'Sent command to play artist' });
});

playRouter.post('/playlist', async (req, res) => {
	const { playlistURI } = req.body;

	if (!playlistURI || typeof playlistURI !== 'string')
		return res.status(400).json({ errors: ['No playlist URI provided'] });

	await playPlaylist(playlistURI);
	res.status(200).json({ message: 'Sent command to play playlist' });
});
playRouter.get('/getState', async (req, res) => {
	const results = await getPlayStatus();
	if (!results)
		return res.status(400).json({ errors: ['Could not get playback status'] });
	res.status(200).json(results);
});

export default playRouter;
