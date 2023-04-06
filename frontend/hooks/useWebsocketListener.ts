import { ServerToClientEvents } from '@/../shared/WsTypes'
import { useEffect } from 'react'
import useWebsocket from './useWebsocket'

const useWebsocketListener = (
	event: keyof ServerToClientEvents,
	callback: ServerToClientEvents[keyof ServerToClientEvents]
) => {
	const socket = useWebsocket()

	useEffect(() => {
		if (socket) {
			console.log('Registering event listener for', event)
			socket.on(event, callback)
		}

		return () => {
			if (socket) socket.off(event, callback)
		}
	}, [socket])
}

export default useWebsocketListener
