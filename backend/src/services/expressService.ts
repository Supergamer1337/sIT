import express, { Express } from 'express';
import deviceRouter from '../routers/deviceRouter.js';
import playRouter from '../routers/playRouter.js';
import searchRouter from '../routers/searchRouter.js';
import spotifyRouter from '../routers/spotifyRouter.js';

export const createServer = async () => {
	const app = express();
	setupRoutes(app);
	return app;
};

const setupRoutes = async (app: Express) => {
	app.use('/api/spotify', spotifyRouter);
	app.use('/api/search', searchRouter);
	app.use('/api/device', deviceRouter);
	app.use('/api/play', playRouter);
};
