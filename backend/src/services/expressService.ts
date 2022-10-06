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
	app.use('/spotify', spotifyRouter);
	app.use('/search', searchRouter);
	app.use('/device', deviceRouter);
	app.use('/play', playRouter);
};
