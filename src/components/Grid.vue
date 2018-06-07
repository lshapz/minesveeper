<template>
<!-- <table>
	<tbody> -->
		<ol>

		<GridLine v-for="(line, lineIndex) in grid" :line="line" :row="lineIndex" :key="lineIndex" /> 
		</ol>

	<!-- </tbody>


</table>	
 -->
</template>

<script>

import {mapState} from 'vuex'	
import Line from './Line'

export default {
	components: {
		GridLine: Line
	},
	data: function(){
		return {

		}
	},
	computed: {
		...mapState({
			grid: state => state.board.grid
		}),

	},
	created(){
		// temporary
		this.$store.commit('makeHard', {hardness: 'easy'})
	}




}

</script>

<style>

</style>