import Gridmaker from '../scripts/gridmaker'


const boardModule = {
	state: {
		grid: [],
		mines: 0,
    totalRows: 0,
    totalColumns: 0
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
			let [newGrid, newMines, rows, columns] = gridSizer(payload.hardness)
			state.mines = newMines
			state.grid = newGrid
      state.totalRows = rows
      state.totalColumns = columns
		},
		flagSquare (state, payload) {
			let flagState = flaggedMe(payload.square, state)
			state.grid = flagState
		},
		clickSquare (state, payload) {
			let clickState = clickedMe(payload.square, state)
			state.grid = clickState
		}
	},
}

const flaggedMe = (array, state) => {
  let [row, column] = array
  let flaggedSquare = state.grid[row][column]
  let revisedGrid = state.grid.slice()
  flaggedSquare = {...flaggedSquare, flag: !flaggedSquare.flag}
  revisedGrid[row][column] = flaggedSquare
  return revisedGrid
};

const clickedMe = (array, state) => { 
  let [row, column] = array
  let clickedSquare = state.grid[row][column]
  let revisedGrid = state.grid.slice()
  clickedSquare = {...clickedSquare, clicked: true}
  revisedGrid[row][column] = clickedSquare
  return revisedGrid
};

// const neighborMaker = (array, state) => {
//       let [row, column] = array
//       let neighbors = [
//           [row-1, column-1], [row-1, column], [row-1, column+1], 
//           [row, column-1], [row, column+1],
//           [row+1, column-1], [row+1, column], [row+1, column+1]
//         ]
//         neighbors.filter(square=>{
//           let [rowN, columnN] = square 
//           if (rowN >= 0 && columnN >= 0 && rowN <= (state.totalRows - 1) && columnN <= state.totalColumns - 1) {
//             let realSquare = state.grid[rowN][columnN]
//             if (realSquare.image !== 'mine' && !realSquare.clicked) {
//               return square
//             }

//           }
//         })
          
//        return neighbors
// }


function gridSizer(difficulty){
  let grid;
  switch(difficulty) {
    case 'easy':
      grid = Gridmaker(9, 10);
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