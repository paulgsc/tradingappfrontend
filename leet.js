const isValidSudoku = (board) => {
    let n = 0;
    for (let row = 0; row < 9; row++){
        let side = {};
        let down = {};
        let Grid = {};
        for(let column = 0; column < 9; column++){
            if(side[board[row][column]] === 1 || down[board[column][row]] === 1){
                return false;
            }
            if(board[row][column] !== '.') side[board[row][column]] = 1;
            if(board[column][row] !== '.') down[board[column][row]] = 1;
            
            const nthGrid =  row + 1;
            if(Grid[board[row][column]] === nthGrid) return false;
                
            if(board[row][column] !== '.') Grid[board[row][column]] = nthGrid;
            console.log([row, column,  n + Math.ceil((column + 1) / 3) ])
        }
        n += 3;


    }
    return true;
}

const board =[[".",".",".",".","5",".",".","1","."],[".","4",".","3",".",".",".",".","."],[".",".",".",".",".","3",".",".","1"],["8",".",".",".",".",".",".","2","."],[".",".","2",".","7",".",".",".","."],[".","1","5",".",".",".",".",".","."],[".",".",".",".",".","2",".",".","."],[".","2",".","9",".",".",".",".","."],[".",".","4",".",".",".",".",".","."]];

console.log(isValidSudoku(board));
