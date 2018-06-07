<template>
	<span :style="{color: randomColor()}">
		Column: {{column}}
	</span>

</template>

<script>
	
export default {
	data: function(){
		return {
			
		}
	},
	props: ['row', 'column'],
	methods: {
		// temporary
		randomColor(){
			let colorsArray = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violets']
			let index = Math.floor(Math.random() * (colorsArray.length - 1))
			console.log(colorsArray[index])
			return colorsArray[index]
		}
	}
}

</script>

<style>

</style>