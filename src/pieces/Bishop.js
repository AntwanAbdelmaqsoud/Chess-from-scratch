function WhiteBishop(Xpos, Ypos, board, moveBoard) {
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


    return newboard;
}

function BlackBishop(Xpos, Ypos, board, moveBoard) {
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

    return newboard;
}


export { WhiteBishop, BlackBishop };