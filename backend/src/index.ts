import { createServer } from './services/expressService.js';
import { readSpotifyAuth } from './services/authService.js';
import { config } from 'dotenv';
config();

const app = await createServer();

app.listen(process.env.PORT, () => {
	console.log(`Server running on port ${process.env.PORT}`);
	readSpotifyAuth();
});
