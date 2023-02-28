import socketio from 'socket.io';
import connectSocket from 'spotify-connect-ws';

const io = socketio(server);
io.of('connect').on('connection', connectSocket);
