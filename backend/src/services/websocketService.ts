import { Express } from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import {
	ClientToServerEvents,
	InterServerEvents,
	ServerToClientEvents,
	SocketData
} from '../../../shared/WsTypes';
import { getPlayStatus } from './playService.js';

let io: Server;

export const initWebsocket = (app: Express) => {
	const server = createServer(app);

	io = new Server<
		ClientToServerEvents,
		ServerToClientEvents,
		InterServerEvents,
		SocketData
	>(server, {
		cors: {
			origin: '*'
		}
	});

	io.on('connection', (socket) => {
		socket.on('get-playback-state', async () => {
			const status = await getPlayStatus();
			if (!status) return console.log('No status to be sent to client');

			socket.emit('update-playback-state', status);
		});
	});

	return server;
};
