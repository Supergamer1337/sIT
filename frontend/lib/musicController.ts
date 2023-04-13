import { apiGet, apiPost } from './api'

const musicController = async (controlType: string) => {
	try {
		apiGet(`/control/${controlType}`);
	} catch (error) {
		console.error(error)
	}
}

export const playMusic = async () => {
	musicController('play')
}

export const pauseMusic = async () => {
	musicController('pause')
}

export const nextSong = async () => {
	musicController('next')
}

export const previousSong = async () => {
	musicController('previous')
}

export const startSong = async (songURI: string) => {
	try {
		await apiPost('/play/song', { songURI })
		console.log('Playing song')
	} catch (error: any) {
		console.error('Failed to play song with the following error:\n' + error)
	}
}
