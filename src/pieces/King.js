let KnightMoves = [{ X: 2, Y: 1 }, { X: 1, Y: 2 }, { X: -2, Y: -1 }, { X: -1, Y: -2 }, { X: -2, Y: 1 }, { X: 2, Y: -1 }, { X: 1, Y: -2 }, { X: -1, Y: 2 }]



function WhiteKing(Xpos, Ypos, colIndex, rowIndex, board) {
    if ((Math.abs(colIndex - Xpos) <= 1 && Math.abs(rowIndex - Ypos) <= 1 && Math.abs(rowIndex - Ypos) + Math.abs(colIndex - Xpos) >= 1) &&
        (board[rowIndex][colIndex] == '' || board[rowIndex][colIndex].charCodeAt(0) > 97) && !isWhiteKingInCheck(colIndex, rowIndex, board)) {
        return true;
    } else {
        return false;
    }
}

function BlackKing(Xpos, Ypos, colIndex, rowIndex, board) {
    if ((Math.abs(colIndex - Xpos) <= 1 && Math.abs(rowIndex - Ypos) <= 1 && Math.abs(rowIndex - Ypos) + Math.abs(colIndex - Xpos) >= 1) &&
        (board[rowIndex][colIndex] == '' || board[rowIndex][colIndex].charCodeAt(0) < 97) && !isBlackKingInCheck(colIndex, rowIndex, board)) {
        return true;
    } else {
        return false;
    }
}

function isWhiteKingInCheck(Xpos, Ypos, board) {

    for (let index = 1;
        (index + Xpos <= 7 && index + Ypos <= 7); index++) {
        if (board[Ypos + index][Xpos + index] == 'b' || board[Ypos + index][Xpos + index] == 'q' || (board[Ypos + index][Xpos + index] == 'k' && index == 1)) {
            return true;
        } else {
            if (board[Ypos + index][Xpos + index] != '' && board[Ypos + index][Xpos + index] != 'K') {
                break;
            }
        }
    }

    for (let index = 1;
        (index + Xpos <= 7 && Ypos - index >= 0); index++) {
        if (board[Ypos - index][Xpos + index] == 'b' || board[Ypos - index][Xpos + index] == 'q' || (board[Ypos - index][Xpos + index] == 'p' && index == 1) || (board[Ypos - index][Xpos + index] == 'k' && index == 1)) {
            return true;
        } else {
            if (board[Ypos - index][Xpos + index] != '' && board[Ypos - index][Xpos + index] != 'K') {
                break;
            }
        }
    }

    for (let index = 1;
        (Xpos - index >= 0 && Ypos + index <= 7); index++) {
        if (board[Ypos + index][Xpos - index] == 'b' || board[Ypos + index][Xpos - index] == 'q' || (board[Ypos + index][Xpos - index] == 'k' && index == 1)) {
            return true;
        } else {
            if (board[Ypos + index][Xpos - index] != '' && board[Ypos + index][Xpos - index] != 'K') {
                break;
            }
        }
    }

    for (let index = 1;
        (Xpos - index >= 0 && Ypos - index >= 0); index++) {
        if (board[Ypos - index][Xpos - index] == 'b' || board[Ypos - index][Xpos - index] == 'q' || (board[Ypos - index][Xpos - index] == 'p' && index == 1) || (board[Ypos - index][Xpos - index] == 'k' && index == 1)) {
            return true;
        } else {
            if (board[Ypos - index][Xpos - index] != '' && board[Ypos - index][Xpos - index] != 'K') {
                break;
            }
        }

    }

    for (let index = Xpos + 1; index <= 7; index++) {
        if (board[Ypos][index] == 'q' || board[Ypos][index] == 'r' || (board[Ypos][index] == 'k' && index == Xpos + 1)) {
            return true;
        } else {
            if (board[Ypos][index] != '' && board[Ypos][index] != 'K') {
                break;
            }
        }
    }

    for (let index = Xpos - 1; index >= 0; index--) {
        if (board[Ypos][index] == 'q' || board[Ypos][index] == 'r' || (board[Ypos][index] == 'k' && index == Xpos - 1)) {
            return true;
        } else {
            if (board[Ypos][index] != '' && board[Ypos][index] != 'K') {
                break;
            }
        }
    }

    for (let index = Ypos + 1; index <= 7; index++) {
        if (board[index][Xpos] == 'q' || board[index][Xpos] == 'r' || (board[index][Xpos] == 'k' && index == Ypos + 1)) {
            return true;
        } else {
            if (board[index][Xpos] != '' && board[index][Xpos] != 'K') {
                break;
            }
        }
    }

    for (let index = Ypos - 1; index >= 0; index--) {
        if (board[index][Xpos] == 'q' || board[index][Xpos] == 'r' || (board[index][Xpos] == 'k' && index == Ypos - 1)) {
            return true;
        } else {
            if (board[index][Xpos] != '' && board[index][Xpos] != 'K') {
                break;
            }
        }
    }

    for (let index = 0; index < 8; index++) {
        if (Xpos + KnightMoves[index].X >= 0 && Xpos + KnightMoves[index].X <= 7 && Ypos + KnightMoves[index].Y >= 0 && Ypos + KnightMoves[index].Y <= 7) {
            if (board[Ypos + KnightMoves[index].Y][Xpos + KnightMoves[index].X] == 'n') {
                return true;
            }
        }

    }
    return false;
}

function isBlackKingInCheck(Xpos, Ypos, board) {
    for (let index = 1;
        (index + Xpos <= 7 && index + Ypos <= 7); index++) {
        if (board[Ypos + index][Xpos + index] == 'B' || board[Ypos + index][Xpos + index] == 'Q' || (board[Ypos + index][Xpos + index] == 'P' && index == 1) || (board[Ypos + index][Xpos + index] == 'K' && index == 1)) {
            return true;
        } else {
            if (board[Ypos + index][Xpos + index] != '' && board[Ypos + index][Xpos + index] != 'k') {
                break;
            }
        }
    }

    for (let index = 1;
        (index + Xpos <= 7 && Ypos - index >= 0); index++) {
        if (board[Ypos - index][Xpos + index] == 'B' || board[Ypos - index][Xpos + index] == 'Q' || (board[Ypos - index][Xpos + index] == 'K' && index == 1)) {
            return true;
        } else {
            if (board[Ypos - index][Xpos + index] != '' && board[Ypos - index][Xpos + index] != 'k') {
                break;
            }
        }
    }

    for (let index = 1;
        (Xpos - index >= 0 && Ypos + index <= 7); index++) {
        if (board[Ypos + index][Xpos - index] == 'B' || board[Ypos + index][Xpos - index] == 'Q' || (board[Ypos + index][Xpos - index] == 'P' && index == 1) || (board[Ypos + index][Xpos - index] == 'K' && index == 1)) {
            return true;
        } else {
            if (board[Ypos + index][Xpos - index] != '' && board[Ypos + index][Xpos - index] != 'k') {
                break;
            }
        }
    }

    for (let index = 1;
        (Xpos - index >= 0 && Ypos - index >= 0); index++) {
        if (board[Ypos - index][Xpos - index] == 'B' || board[Ypos - index][Xpos - index] == 'Q' || (board[Ypos - index][Xpos - index] == 'K' && index == 1)) {
            return true;
        } else {
            if (board[Ypos - index][Xpos - index] != '' && board[Ypos - index][Xpos - index] != 'k') {
                break;
            }
        }

    }

    for (let index = Xpos + 1; index <= 7; index++) {
        if (board[Ypos][index] == 'Q' || board[Ypos][index] == 'R' || (board[Ypos][index] == 'K' && index == Xpos + 1)) {
            return true;
        } else {
            if (board[Ypos][index] != '' && board[Ypos][index] != 'k') {
                break;
            }
        }
    }

    for (let index = Xpos - 1; index >= 0; index--) {
        if (board[Ypos][index] == 'Q' || board[Ypos][index] == 'R' || (board[Ypos][index] == 'K' && index == Xpos - 1)) {
            return true;
        } else {
            if (board[Ypos][index] != '' && board[Ypos][index] != 'k') {
                break;
            }
        }
    }

    for (let index = Ypos + 1; index <= 7; index++) {
        if (board[index][Xpos] == 'Q' || board[index][Xpos] == 'R' || (board[index][Xpos] == 'K' && index == Ypos + 1)) {
            return true;
        } else {
            if (board[index][Xpos] != '' && board[index][Xpos] != 'k') {
                break;
            }
        }
    }

    for (let index = Ypos - 1; index >= 0; index--) {
        if (board[index][Xpos] == 'Q' || board[index][Xpos] == 'R' || (board[index][Xpos] == 'K' && index == Ypos - 1)) {
            return true;
        } else {
            if (board[index][Xpos] != '' && board[index][Xpos] != 'k') {
                break;
            }
        }
    }

    for (let index = 0; index < 8; index++) {
        if (Xpos + KnightMoves[index].X >= 0 && Xpos + KnightMoves[index].X <= 7 && Ypos + KnightMoves[index].Y >= 0 && Ypos + KnightMoves[index].Y <= 7) {
            if (board[Ypos + KnightMoves[index].Y][Xpos + KnightMoves[index].X] == 'N') {
                return true;
            }
        }

    }
    return false;
}

export { WhiteKing, BlackKing, isWhiteKingInCheck, isBlackKingInCheck }