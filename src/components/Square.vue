<template>
	<span>

		<img class="box" :src='require(`@/assets/boardImages/${myImageSrc}`)'></img>
	</span>
</template>

<script>
import {mapState} from 'vuex'	

export default {
	data: function(){
		return {
			
		}
	},
	props: ['row', 'column'],
	methods: {
	},
	computed: {
		...mapState({
			game: state => state.game,
			grid: state => state.board.grid
		}),
		meSquare(){
			return this.grid[this.row][this.column]
		},
		myImageSrc(){
			let imageSource = this.meSquare.image
			if (this.meSquare.clicked || this.game.lost || this.game.won) {
				return `${this.meSquare.image}.png`
			} else if (this.meSquare.flag) {
				return 'flag.png'
			} else {
				return 'X.png'
			}
		},

	}
}

</script>

<style>

</style>