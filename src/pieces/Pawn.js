function WhitePawn(Xpos, Ypos, colIndex, rowIndex, board, lastMove) {
    if ((colIndex == Xpos && rowIndex == Ypos - 1 && board[rowIndex][colIndex] == '') ||
        (Ypos == 6 && colIndex == Xpos && rowIndex == Ypos - 2 && board[rowIndex][colIndex] == '' && board[rowIndex + 1][colIndex] == '') ||
        (colIndex == Xpos - 1 && rowIndex == Ypos - 1 && board[rowIndex][colIndex].charCodeAt(0) > 97) ||
        (colIndex == Xpos + 1 && rowIndex == Ypos - 1 && board[rowIndex][colIndex].charCodeAt(0) > 97) ||
        (Ypos == 3 && lastMove.piece == 'p' && lastMove.from.Y == 1 && lastMove.to.Y == 3 && rowIndex == 2 && colIndex == lastMove.to.X)) {
        return true;
    } else {
        return false;
    }
}

function BlackPawn(Xpos, Ypos, colIndex, rowIndex, board, lastMove) {
    if ((colIndex == Xpos && rowIndex == Ypos + 1 && board[rowIndex][colIndex] == '') ||
        (Ypos == 1 && colIndex == Xpos && rowIndex == Ypos + 2 && board[rowIndex][colIndex] == '' && board[rowIndex - 1][colIndex] == '') ||
        (colIndex == Xpos - 1 && rowIndex == Ypos + 1 && board[rowIndex][colIndex].charCodeAt(0) < 97) ||
        (colIndex == Xpos + 1 && rowIndex == Ypos + 1 && board[rowIndex][colIndex].charCodeAt(0) < 97) ||
        (Ypos == 4 && lastMove.piece == 'P' && lastMove.from.Y == 6 && lastMove.to.Y == 4 && rowIndex == 5 && colIndex == lastMove.to.X)) {
        return true;
    } else {
        return false;
    }
}

export { BlackPawn, WhitePawn };