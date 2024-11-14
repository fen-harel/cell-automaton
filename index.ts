// The program uses a look-up table model. It's states are of type: number.
//  Values regarding state are stored at array[state] index.
//
// ---xxx---

const BOARD_ROWS = 32
const BOARD_COLS = BOARD_ROWS

type State = number
type Board = State[][]

const stateColors = ["#202020", "#ff5050", "#50ff50", "#5050ff"]

function createBoard(): Board {
  const board: Board = []
  for (let r = 0; r < BOARD_ROWS; r++) {
    board.push(new Array<State>(BOARD_COLS).fill(0))
  }
  console.log(board)
  return board
}

const canvasId = "app"
const app = document.getElementById(canvasId) as HTMLCanvasElement
if (app === null) {
  throw new Error(`Could not find canvas ${canvasId}`)
}
app.width = 800
app.height = 800
const ctx = app.getContext("2d")
if (ctx === null) {
  throw new Error(`Could not initialize 2d context`)
}

const nextId = "next"
const next = document.getElementById(nextId) as HTMLButtonElement
if (next === null) {
  throw new Error(`Could not find button ${nextId}`)
}
console.log(next)

const CELL_WIDTH = app.width / BOARD_ROWS
const CELL_HEIGHT = app.height / BOARD_COLS

let currentBoard = createBoard()
let nextBoard = createBoard()

function countNbors(board: Board, nbors: number[], r0: number, c0: number) {
  nbors.fill(0)
  for (let dr = -1; dr <= 1; ++dr) {
    for (let dc = -1; dc <= 1; ++dc) {
      // De Morgan's Law
      if (dr != 0 || dc != 0) {
        // Coordinates relative to center
        // 000
        // 0.0
        // 000
        const r = r0 + dr
        const c = c0 + dc

        if (0 <= r && r < BOARD_ROWS) {
          if (0 <= c && c < BOARD_COLS) {
            // state of cell corresponds to index of neighbor count
            nbors[board[r][c]]++
          }
        }
      }
    }
  }
  console.log(nbors)
}

interface Transition {
  [key: string]: number
  default: number
}

type Automaton = State[]

const Seeds: Automaton = [
  {
    "62": 1,
    default: 0,
  },
  {
    default: 0,
  },
]

const GoL: Automaton = [
  {
    "53": 1,
    default: 0,
  },
  {
    "62": 1,
    "53": 1,
    default: 0,
  },
]

function computeNextBoard(automaton: Automaton, currentBoard: Board, next: Board) {
  // Value of states correspond to their index in nbors
  const DEAD = 0
  const ALIVE = 1
  // initiates array -> []
  // value of the cell is its state
  const nbors = new Array(automaton.length).fill(0)
  for (let r = 0; r < BOARD_ROWS; r++) {
    for (let c = 0; c < BOARD_COLS; c++) {
      countNbors(currentBoard, nbors, r, c)
      // Gives next state: 1 | 0
      const transition = automaton[currentBoard[r][c]]
      next[r][c] = transition[nbors.join("")]
      if (next[r][c] === undefined) {
        next[r][c] = transition["default"]
      }
    }
  }
}

function render(ctx: CanvasRenderingContext2D, board: Board) {
  ctx.fillStyle = "#202020"
  ctx.fillRect(0, 0, app.width, app.height)

  ctx.fillStyle = "#ff5050"
  for (let r = 0; r < BOARD_ROWS; r++) {
    for (let c = 0; c < BOARD_COLS; c++) {
      const x = c * CELL_WIDTH
      const y = r * CELL_HEIGHT
      ctx.fillStyle = stateColors[board[r][c]]
      ctx.fillRect(x, y, CELL_WIDTH, CELL_HEIGHT)
    }
  }
}

app.addEventListener("click", e => {
  const col = Math.floor(e.offsetX / CELL_WIDTH)
  const row = Math.floor(e.offsetY / CELL_HEIGHT)

  const state = document.getElementsByName("state")
  // sets state according to that selected
  for (let i = 0; i < state.length; i++) {
    if ((state[i] as HTMLInputElement).checked) {
      currentBoard[row][col] = i
      render(ctx, currentBoard)
      return
    }
  }
})

next.addEventListener("click", e => {
  console.log("NEXT")
  // computeNextBoard(GoL, currentBoard, nextBoard)
  computeNextBoard(Seeds, currentBoard, nextBoard)
  ;[currentBoard, nextBoard] = [nextBoard, currentBoard]
  render(ctx, currentBoard)
})

render(ctx, currentBoard)
