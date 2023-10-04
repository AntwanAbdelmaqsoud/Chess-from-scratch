function WhiteRook(Xpos, Ypos, board, moveBoard) {
    let newboard = [...moveBoard];

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


function BlackRook(Xpos, Ypos, board, moveBoard) {
    let newboard = [...moveBoard];

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






export { WhiteRook, BlackRook };