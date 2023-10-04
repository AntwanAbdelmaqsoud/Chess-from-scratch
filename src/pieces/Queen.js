function WhiteQueen(Xpos, Ypos, board, moveBoard) {
    let newboard = [...moveBoard];

    for (let index = 1;
        (index + Xpos <= 7 && index + Ypos <= 7); index++) {
        if (board[Ypos + index][Xpos + index] == '') {
            newboard[Ypos + index][Xpos + index] = true;
        } else {
            if (board[Ypos + index][Xpos + index].charCodeAt(0) > 97) {
                newboard[Ypos + index][Xpos + index] = true;
            }
            break;
        }
    }
    for (let index = 1;
        (index + Xpos <= 7 && Ypos - index >= 0); index++) {
        if (board[Ypos - index][Xpos + index] == '') {
            newboard[Ypos - index][Xpos + index] = true;
        } else {
            if (board[Ypos - index][Xpos + index].charCodeAt(0) > 97) {
                newboard[Ypos - index][Xpos + index] = true;
            }
            break;
        }
    }
    for (let index = 1;
        (Xpos - index >= 0 && Ypos + index <= 7); index++) {
        if (board[Ypos + index][Xpos - index] == '') {
            newboard[Ypos + index][Xpos - index] = true;
        } else {
            if (board[Ypos + index][Xpos - index].charCodeAt(0) > 97) {
                newboard[Ypos + index][Xpos - index] = true;
            }
            break;
        }
    }
    for (let index = 1;
        (Xpos - index >= 0 && Ypos - index >= 0); index++) {
        if (board[Ypos - index][Xpos - index] == '') {
            newboard[Ypos - index][Xpos - index] = true;
        } else {
            if (board[Ypos - index][Xpos - index].charCodeAt(0) > 97) {
                newboard[Ypos - index][Xpos - index] = true;
            }
            break;
        }

    }
    for (let index = Xpos + 1; index <= 7; index++) {
        if (board[Ypos][index] == '') {
            newboard[Ypos][index] = true;
        } else {
            if (board[Ypos][index].charCodeAt(0) > 97) {
                newboard[Ypos][index] = true;
            }
            break;
        }
    }
    for (let index = Xpos - 1; index >= 0; index--) {
        if (board[Ypos][index] == '') {
            newboard[Ypos][index] = true;
        } else {
            if (board[Ypos][index].charCodeAt(0) > 97) {
                newboard[Ypos][index] = true;
            }
            break;
        }
    }
    for (let index = Ypos + 1; index <= 7; index++) {
        if (board[index][Xpos] == '') {
            newboard[index][Xpos] = true;
        } else {
            if (board[index][Xpos].charCodeAt(0) > 97) {
                newboard[index][Xpos] = true;
            }
            break;
        }
    }
    for (let index = Ypos - 1; index >= 0; index--) {
        if (board[index][Xpos] == '') {
            newboard[index][Xpos] = true;
        } else {
            if (board[index][Xpos].charCodeAt(0) > 97) {
                newboard[index][Xpos] = true;
            }
            break;
        }
    }


    return newboard;
}


function BlackQueen(Xpos, Ypos, board, moveBoard) {
    let newboard = [...moveBoard];

    for (let index = 1;
        (index + Xpos <= 7 && index + Ypos <= 7); index++) {
        if (board[Ypos + index][Xpos + index] == '') {
            newboard[Ypos + index][Xpos + index] = true;
        } else {
            if (board[Ypos + index][Xpos + index].charCodeAt(0) < 97) {
                newboard[Ypos + index][Xpos + index] = true;
            }
            break;
        }
    }
    for (let index = 1;
        (index + Xpos <= 7 && Ypos - index >= 0); index++) {
        if (board[Ypos - index][Xpos + index] == '') {
            newboard[Ypos - index][Xpos + index] = true;
        } else {
            if (board[Ypos - index][Xpos + index].charCodeAt(0) < 97) {
                newboard[Ypos - index][Xpos + index] = true;
            }
            break;
        }
    }
    for (let index = 1;
        (Xpos - index >= 0 && Ypos + index <= 7); index++) {
        if (board[Ypos + index][Xpos - index] == '') {
            newboard[Ypos + index][Xpos - index] = true;
        } else {
            if (board[Ypos + index][Xpos - index].charCodeAt(0) < 97) {
                newboard[Ypos + index][Xpos - index] = true;
            }
            break;
        }
    }
    for (let index = 1;
        (Xpos - index >= 0 && Ypos - index >= 0); index++) {
        if (board[Ypos - index][Xpos - index] == '') {
            newboard[Ypos - index][Xpos - index] = true;
        } else {
            if (board[Ypos - index][Xpos - index].charCodeAt(0) < 97) {
                newboard[Ypos - index][Xpos - index] = true;
            }
            break;
        }

    }
    for (let index = Xpos + 1; index <= 7; index++) {
        if (board[Ypos][index] == '') {
            newboard[Ypos][index] = true;
        } else {
            if (board[Ypos][index].charCodeAt(0) < 97) {
                newboard[Ypos][index] = true;
            }
            break;
        }
    }
    for (let index = Xpos - 1; index >= 0; index--) {
        if (board[Ypos][index] == '') {
            newboard[Ypos][index] = true;
        } else {
            if (board[Ypos][index].charCodeAt(0) < 97) {
                newboard[Ypos][index] = true;
            }
            break;
        }
    }
    for (let index = Ypos + 1; index <= 7; index++) {
        if (board[index][Xpos] == '') {
            newboard[index][Xpos] = true;
        } else {
            if (board[index][Xpos].charCodeAt(0) < 97) {
                newboard[index][Xpos] = true;
            }
            break;
        }
    }
    for (let index = Ypos - 1; index >= 0; index--) {
        if (board[index][Xpos] == '') {
            newboard[index][Xpos] = true;
        } else {
            if (board[index][Xpos].charCodeAt(0) < 97) {
                newboard[index][Xpos] = true;
            }
            break;
        }
    }


    return newboard;
}




export { WhiteQueen, BlackQueen };