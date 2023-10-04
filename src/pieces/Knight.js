function WhiteKnight(Xpos, Ypos, colIndex, rowIndex, board) {
    if ((Math.abs(Xpos - colIndex) == 2 && Math.abs(Ypos - rowIndex) == 1) || (Math.abs(Xpos - colIndex) == 1 && Math.abs(Ypos - rowIndex) == 2)) {
        if (board[rowIndex][colIndex] == '' || board[rowIndex][colIndex].charCodeAt(0) > 97) {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
}

function BlackKnight(Xpos, Ypos, colIndex, rowIndex, board) {
    if ((Math.abs(Xpos - colIndex) == 2 && Math.abs(Ypos - rowIndex) == 1) || (Math.abs(Xpos - colIndex) == 1 && Math.abs(Ypos - rowIndex) == 2)) {
        if (board[rowIndex][colIndex] == '' || board[rowIndex][colIndex].charCodeAt(0) < 97) {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
}



export { BlackKnight, WhiteKnight };