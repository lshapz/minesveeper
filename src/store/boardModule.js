import Gridmaker from '../scripts/gridmaker'


const boardModule = {
	state: {
		grid: [],
		mines: 0
	},
	mutations: {
		resetMines (state){
			state.mines = 0
		}, 
		mineFlagged (state, payload) {
			let flag = payload.flagged ? state.mines -= 1 : state.mines += 1;
			state.mines = flag
		},
		makeHard (state, payload) {
			let [newGrid, newMines] = gridSizer(payload.hardness)
			state.mines = newMines
			state.grid = newGrid
		},
		flagSquare (state, payload) {
			let flagState = flaggedMe(payload.square, state)
			state.grid = flagState
		},
		clickSquare (state, payload) {
			let clickState = clickedMe(payload.square, state)
			state.grid = clickState
		}
	}
}

const flaggedMe = (array, state) => {
  let [row, column] = array
  let flaggedSquare = state.grid[row][column]
  let flag_state =  state.grid.map(line=>{
    return line.map(gridSquare=>{
      if (gridSquare === flaggedSquare) {
        gridSquare.flag = !gridSquare.flag;
      }
      return gridSquare;
    })
  })
  return flag_state;
};

const clickedMe = (array, state) => { 
  let [row, column] = array
  let clickedSquare = state.grid[row][column]
  let click_state =  state.grid.map(line=>{
    return line.map(gridSquare=>{
      if (gridSquare === clickedSquare) {
        gridSquare.clicked = true;
      }
      return gridSquare;
    })
  })
  return click_state;
};

function gridSizer(difficulty){
  let grid;
  switch(difficulty) {
    case 'easy':
      grid = Gridmaker(12, 12);
      break;
    case 'medium':
      grid = Gridmaker(16, 16);
      break;
    case 'hard':
      grid = Gridmaker(16, 32);
      break;
    default: 
      grid = Gridmaker(12, 12);
  }
  return grid;
}


export default boardModule 