import cors from 'cors';
import express, { Express } from 'express';
import controlRouter from '../routers/controlRouter.js';
import deviceRouter from '../routers/deviceRouter.js';
import playRouter from '../routers/playRouter.js';
import queueRouter from '../routers/queueRouter.js';
import searchRouter from '../routers/searchRouter.js';
import spotifyRouter from '../routers/spotifyRouter.js';
import { getPlayStatus } from './playService.js';
import { emitEvent, initWebsocket } from './websocketService.js';

export const createServer = async () => {
	const app = express();
	app.use(cors());
	setupGlobalMiddleware(app);
	setupRoutes(app);
	const server = initWebsocket(app);
	setInterval(async () => {
		// @ts-ignore
		emitEvent('update-playback-state', await getPlayStatus());
	}, 1000);
	return server;
};

const setupRoutes = async (app: Express) => {
	app.use('/api/spotify', spotifyRouter.getRouter());
	app.use('/api/search', searchRouter.getRouter());
	app.use('/api/device', deviceRouter.getRouter());
	app.use('/api/play', playRouter.getRouter());
	app.use('/api/control', controlRouter.getRouter());
	app.use('/api/queue', queueRouter.getRouter());
};

const setupGlobalMiddleware = async (app: Express) => {
	app.use(express.urlencoded({ extended: true }));
	app.use(express.json());
	app.use((req, res, next) => {
		const authHeader = req.headers.authorization;
		if (process.env.GAMMA_AUTH === 'false') next();
		else if (authHeader && authHeader === 'secretPass') next();
		else {
			res.status(401).send('Unauthorized');
		}
	});
};
