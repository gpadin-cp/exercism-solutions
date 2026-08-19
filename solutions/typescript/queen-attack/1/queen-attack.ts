type Position = readonly [number, number]

type Positions = {
  white: Position
  black: Position
}
/*
Default Board w/ chess notation and 0-index equivalent
    0 1 2 3 4 5 6 7
    a b c d e f g h
0 8 _ _ _ B _ _ _ _ 8 0
1 7 _ _ _ _ _ _ _ _ 7 1
2 6 _ _ _ _ _ _ _ _ 6 2
3 5 _ _ _ _ _ _ _ _ 5 3
4 4 _ _ _ _ _ _ _ _ 4 4
5 3 _ _ _ _ _ _ _ _ 3 5
6 2 _ _ _ _ _ _ _ _ 2 6
7 1 _ _ _ W _ _ _ _ 1 7
    a b c d e f g h
    0 1 2 3 4 5 6 7

*/


export class QueenAttack {
  public readonly black: Position
  public readonly white: Position

  // white: [whiteRow, whiteColumn]
  // black: [blackRow, blackColumn]
  constructor({ black = [0, 3], white = [7, 3] }: Partial<Positions> = {}) {


    black && QueenAttack.validatePosition(black)
    white && QueenAttack.validatePosition(white)

    this.black = black;
    this.white = white;

    const QUEENS_SHARE_SQUARE = "Queens cannot share the same space"
    if (this.black?.toString() === this.white?.toString()) throw new Error(QUEENS_SHARE_SQUARE)
  }

  static validatePosition(position: Position) {
    const INVALID_QUEEN_POSITION = "Queen must be placed on the board"
    if (!position) throw new Error(INVALID_QUEEN_POSITION)
    const [rank, column] = position
    const isValid = rank >= 0 && rank <= 7 && column >= 0 && column <= 7
    if (!isValid) throw new Error(INVALID_QUEEN_POSITION)
  }

  toString() {
    let board: any = Array.from({ length: 8 }, () => (Array(8).fill('_')));

    const [blackRank, blackColumn] = this.black;
    const [whiteRank, whiteColumn] = this.white;
    board[blackRank][blackColumn] = "B"
    board[whiteRank][whiteColumn] = "W"
    board = board.map((x: string[]) => x.join(' ')).join('\n')

    // left console in because it is useful in debugging since this is just a small stand alone problem
    console.log(board)
    return board
  }

  get canAttack() : boolean {
    // test cases all have both colors, so just assume we'll return false if either white or black is empty
    const [blackRank, blackColumn] = this.black;
    const [whiteRank, whiteColumn] = this.white;

    // check if they are in the same rank or column
    if (blackRank === whiteRank) return true
    if (blackColumn === whiteColumn) return true;

    // check diagnoal, the abs handles where one piece is a higer rank and the other is a higher column
    // this avoids having to sort them since 5-2 = abs(2-5) and we're only interested in the relative distance, not which piece is further east/west or north/south
    if (Math.abs(blackColumn - whiteColumn) === Math.abs(blackRank - whiteRank)) return true;

    return false
  }
}
