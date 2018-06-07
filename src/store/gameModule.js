
import imageMap from './imageMap.js'

const gameModule = {
	state: {
		playing: false,
		lost: false,
		won: false,
		images: imageMap
	},
	mutations: {
		startGame(state){
			console.log('WASSUP')
			state.playing = true
		},
		winGame(state){
			console.log('HUZZZAH')
			state.playing = false
			state.won = true
		},
		loseGame(state){
			console.log('SORRY')
			state.playing = false
			state.lost = true
		},
		resetGame(state) {
			state.playing = false
			state.lost = false
			state.won = false
		}
	}

}

export default gameModule