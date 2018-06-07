<template>
	<li class="row">
		<Square v-for="(cell, cellIndex) in line" :row="row" :column="cellIndex" :key="cellIndex" />
	</li>

<!-- 	<li class="row">
		<span :style="{color: randomColor()}"  v-for="(cell, cellIndex) in line" :key="cellIndex">
		{{cell}}
		</span>
	</li> -->

</template>

<script>
import Square from './Square'	

export default {
	components: {
		Square
	},
	data: function(){
		return {
			
		}
	},
	props: ['line', 'row'],
	methods: {
		// temporary
		randomColor(){
			let colorsArray = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violets']
			let index = Math.floor(Math.random() * (colorsArray.length - 1))
			return colorsArray[index]
		}
	}
}



</script>

<style>

</style>