import { ClientToServerEvents, ServerToClientEvents } from '@/../shared/WsTypes'
import { useEffect } from 'react'
import useWebsocket from './useWebsocket'

/**
 * This hook is used to avoid race conditions when starting to listen to an event,
 * and then immediately emitting an event that will trigger the event listener.
 * @param event Server event to listen to.
 * @param callback Callback to be called when the event is triggered.
 * @param emit Event to emit to trigger the event listener.
 * @param emitData Data to be sent with the event.
 */
export const useWebsocketListenAndEmit = (
	event: keyof ServerToClientEvents,
	callback: ServerToClientEvents[keyof ServerToClientEvents],
	emit: keyof ClientToServerEvents,
	emitData: Parameters<ClientToServerEvents[keyof ClientToServerEvents]>
) => {
	const socket = useWebsocket()

	useEffect(() => {
		if (socket) {
			socket.on(event, callback)
			socket.emit(emit, ...emitData)
		}

		return () => {
			if (socket) socket.off(event, callback)
		}
	}, [socket])
}
