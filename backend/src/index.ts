import { createServer } from './services/expressService.js';
import { config } from 'dotenv';
import { readSpotifyAuth } from './services/playService.js';
config();

const app = await createServer();

app.listen(process.env.PORT, () => {
	console.log(`Server running on port ${process.env.PORT}`);
	readSpotifyAuth();
});
