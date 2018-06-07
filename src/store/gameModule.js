const gameModule = {
	state: {
		playing: false,
		lost: false,
		won: false
	},
	mutations: {
		startGame(state){
			state.playing = true
		},
		winGame(state){
			state.playing = false
			state.won = true
			console.log('HUZZZAH')
		},
		loseGame(state){
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