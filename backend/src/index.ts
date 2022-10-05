import { createServer } from './services/expressService.js';
import { config } from 'dotenv';
import { getSpotifyAuthString } from './services/spotifyService.js';
config();

const app = await createServer();

app.listen(process.env.PORT, () => {
	console.log(`Server running on port ${process.env.PORT}`);
	console.log(`Authorize the app using: ${getSpotifyAuthString()}`);
});
