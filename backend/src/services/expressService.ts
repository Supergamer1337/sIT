import express, { Express } from 'express';
import spotifyRouter from '../routers/spotifyRouter.js';

export const createServer = async () => {
	const app = express();

	setupRoutes(app);

	return app;
};

const setupRoutes = async (app: Express) => {
	app.use('/spotify', spotifyRouter);
};
