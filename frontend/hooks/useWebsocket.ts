import { useEffect, useState } from 'react'
import { Socket, io } from 'socket.io-client'

import {
	ClientToServerEvents,
	ServerToClientEvents
} from '../../shared/WsTypes'

const useWebsocket = () => {
	const [socket, setSocket] = useState<Socket<
		ServerToClientEvents,
		ClientToServerEvents
	> | null>(null)

	useEffect(() => {
		if (!socket) {
			const socket = io('http://localhost:8080')
			setSocket(socket)
		}

		return () => {}
	}, [])

	return socket
}

export default useWebsocket
