<template>
	<span>
<!-- 		<span @click.stop="handleClick" @contextmenu.stop="handleContextMenu">
			{{imagePath}}

		</span>
 -->

		<img class="box" :src='imageSource' @click.stop="handleClick" @contextmenu.stop="handleContextMenu"></img>
	</span>
</template>

<script>
import {mapState, mapGetters} from 'vuex'	

export default {
	props: ['row', 'column'],
	computed: {
		...mapState({
			game: state => state.game,
			grid: state => state.board.grid,
			totalRows: state => state.board.totalRows,
			totalColumns: state => state.board.totalColumns,

		}),
		meSquare(){
			return this.grid[this.row][this.column]
		},
		clickStatus(){
			return this.meSquare.clicked
		},
		imagePath(){
			let imageSource = this.meSquare.image
			if (this.game.won) {
				return this.meSquare.mine ? 'flag.png' : `${this.meSquare.image}.png`
			} else if (this.meSquare.clicked || this.game.lost) {
				return `${this.meSquare.image}.png`
			} else if (this.meSquare.flag) {
				return 'flag.png'
			} else {
				return 'X.png'
			}
		},
		imageSource(){
			return this.game.images[this.imagePath]
		},
		neighbors(){
			let row = this.row, 
				column = this.column;
			let neighbors = [
		      [row-1, column-1], [row-1, column], [row-1, column+1], 
		      [row, column-1], [row, column+1],
		      [row+1, column-1], [row+1, column], [row+1, column+1]
		    ]
		   return neighbors
		}
	},
	watch: {
		clickStatus(data){
			if (data) {
				if (this.meSquare.image === 0) {
					this.handleNeighbors(this.neighbors)
				}
			}
		},

	},
	methods: {
		handleNeighbors(neighbors){
			let filtered = neighbors
			.forEach( (square)=>  {
			    let [row, column] = square 
			    if (row >= 0 && column >= 0 && row <= (this.totalRows - 1) && column <= this.totalColumns - 1) {
			    	let realSquare = this.grid[row][column]
			    	if (realSquare.image !== 'mine' && !realSquare.clicked) {
			          this.$store.commit('clickSquare', {square: [row, column]
			          })

			    	}

			    }
			  })
		},
		handleClick(event){
			console.log('start click')
			if (this.game.playing === false) {
				console.log('begin')
				this.$store.commit('clickSquare', {square: [this.row, this.column]})
				this.$store.commit('startGame')
			}
			if (this.meSquare.flag) {
				return
			} else if (this.meSquare.mine) {
				this.$store.commit('loseGame')
			} else if (!this.meSquare.clicked) {
				this.$store.commit('clickSquare', {square: [this.row, this.column]})
			} 
			// else if (this.meSquare.clicked) {
			// 	let doubleNeighbors = this.getDoubleNeighbors()
			// 	if (doubleNeighbors) {
			// 		console.log('dowdy')
			// 		this.handleNeighbors(doubleNeighbors)
			// 	}
			// }
		},
		handleContextMenu(event){
			event.preventDefault()
			if (this.game.playing === false) {
				this.$store.commit('startGame')
			}
			if (this.meSquare.clicked) {
				return
			} else {
				this.$store.commit('flagSquare', {square: [this.row, this.column]})
				this.$store.commit('mineFlagged', {flagged: this.meSquare.flag})
			}
		},
		getDoubleNeighbors(){
			let count = 0
			let number = this.meSquare.image
			let newClickers = []
			this.neighbors.forEach(friend => {
				let [row, column] = friend
				if (row >= 0 && column >= 0 && row <= (this.totalRows - 1) && column <= this.totalColumns - 1){
				let square = this.grid[row][column]
					if (!square.clicked && !square.flag){
						newClickers.push(friend)
					} else if (!square.clicked && square.flag) {
						count += 1
					}
				}
			})
			if (count >= number) {
				return newClickers
			} else {
				return null 
			}
		}
	}
}

</script>

<style>

</style>


<!-- let imageSource = this.meSquare.image
			if (this.game.won) {
			return this.meSquare.mine ? 'F' : `${this.meSquare.image}`

				// return this.meSquare.mine ? 'flag.png' : `${this.meSquare.image}.png`
			} else if (this.meSquare.clicked || this.game.lost) {
				return `${this.meSquare.image}` // .png`
			} else if (this.meSquare.flag) {
				return 'F' //'flag.png'
			} else {
				return 'X' // .png'
			} -->