export interface ServerToClientEvents {
	'update-playback-state': (data: {
		name: string
		artist: string[]
		album: string
		time: {
			current: number
			total: number
		}
		controls: {
			isPlaying: boolean
			isShuffle: boolean
			isRepeat: boolean
		}
	}) => void
}

export interface ClientToServerEvents {
	'get-playback-state': () => void
}

export interface InterServerEvents {}

export interface SocketData {}
