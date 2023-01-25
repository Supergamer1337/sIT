import ErrorHandlingRouter from '../classes/ErrorHandlingRouter.js';
import {
	playAlbum,
	playArtist,
	playPlaylist,
	playSong
} from '../services/playService.js';

const playRouter = new ErrorHandlingRouter();

playRouter.post('/song', async (req, res) => {
	const { songURI } = req.body;

	if (!songURI || typeof songURI !== 'string')
		return res.status(400).json({ errors: ['No song URI provided'] });

	await playSong(songURI);
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
	const { playlistURI } = req.params;

	if (!playlistURI || typeof playlistURI !== 'string')
		return res.status(400).json({ errors: ['No playlist URI provided'] });

	await playPlaylist(playlistURI);
	res.status(200).json({ message: 'Sent command to play playlist' });
});

export default playRouter;
