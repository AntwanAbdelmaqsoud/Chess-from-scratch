import { useState, useEffect} from 'react'
import {DndContext} from '@dnd-kit/core'

import move from "./assets/move-self.mp3"
import capture from "./assets/capture.mp3"

import ChessSquare from './Components/ChessSquare';
import ChoosePiece from "./Utils/ChoosePiece"


import { BlackPawn, WhitePawn} from './pieces/Pawn';
import { WhiteRook, BlackRook } from './pieces/Rook';
import { BlackKnight, WhiteKnight } from './pieces/Knight';
import { WhiteBishop, BlackBishop } from './pieces/Bishop';
import { BlackQueen, WhiteQueen } from './pieces/Queen';
import { BlackKing, WhiteKing, isBlackKingInCheck, isWhiteKingInCheck } from './pieces/King';

const whitePromotion = ['Q', 'R', 'B', 'N'];
const blackPromotion = ['q', 'r', 'b', 'n'];


function captureSound() {
    new Audio(capture).play(); 
}
function moveSound() {
    new Audio(move).play();
}

export default function Chess() {
    
    
    //Sizing The Board
    const [boardSize, setBoardSize] = useState(Math.min(window.innerWidth-15,500));
    const [mousePos, setMousePos] = useState({X:0, Y:0, initialBoard: 0});
    const [squareSize, setSquareSize] = useState(62.5)

    useEffect(()=>{
        setSquareSize(boardSize/8.0);
    },[boardSize])
    
    const StartResize = (e)=>{
        let ClientX, ClientY;

            ClientX = e.clientX;
            ClientY = e.clientY;
        setMousePos({X:ClientX, Y:ClientY, initialBoard:boardSize});
    }        
    const ResizeBoard = (e)=>{
        let delta = e.clientX - mousePos.X + e.clientY - mousePos.Y; 
        setBoardSize(Math.max(250,Math.min(800, mousePos.initialBoard+delta)));
    }





    //Board and Piece Selection.
    const [movesBoard, setMovesBoard] = useState([
        [false,false,false,false,false,false,false,false],
        [false,false,false,false,false,false,false,false],
        [false,false,false,false,false,false,false,false],
        [false,false,false,false,false,false,false,false],
        [false,false,false,false,false,false,false,false],
        [false,false,false,false,false,false,false,false],
        [false,false,false,false,false,false,false,false],
        [false,false,false,false,false,false,false,false]
    ]);
    const [board, setBoard] = useState([
        ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
        ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', ''],
        ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
        ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R'],
    ]);
    const [numberOfPieces,setNumberOfPieces] = useState(32);

    const [isInCheck, setIsInCheck] = useState(false);
    const [isWhiteTurn, setIsWhiteTurn] = useState(true);

    //For castling.
    const [didThisRookMove, setDidThisRookMove] = useState([false, false, false, false]);
    const [didThisKingMove, setDidThisKingMove] = useState([false, false]);


    //To not loop each turn.
    const [whiteKingPosition, setWhiteKingPosition] = useState({Y:7, X:4});
    const [blackKingPosition, setBlackKingPosition] = useState({Y:0, X:4});

    const [selectedPiece, setSelectedPiece] = useState(null);
    const [lastMove, setLastMove] = useState({piece:null, from:null, to:null});

    //To show the appropiate divs
    const [isGameOver, setIsGameOver] = useState(false);
    const [isPrommoting, setIsPrommoting] = useState(false);

    //Resets all state to default when New game button is clicked.
    function newGame(){
        setIsPrommoting(false);
        setIsGameOver(false);
        setLastMove({piece:null, from:null, to:null})
        setSelectedPiece(null);
        setWhiteKingPosition({Y:7, X:4});
        setBlackKingPosition({Y:0, X:4});
        setDidThisKingMove([false, false]);
        setDidThisRookMove([false, false, false, false]);
        setIsWhiteTurn(true);
        setIsInCheck(false);
        setMovesBoard([
            [false,false,false,false,false,false,false,false],
            [false,false,false,false,false,false,false,false],
            [false,false,false,false,false,false,false,false],
            [false,false,false,false,false,false,false,false],
            [false,false,false,false,false,false,false,false],
            [false,false,false,false,false,false,false,false],
            [false,false,false,false,false,false,false,false],
            [false,false,false,false,false,false,false,false]
        ]);
        setBoard([
            ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
            ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
            ['', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', ''],
            ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
            ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R'],
        ]);
    }

    //Check for game Over after every change in the board state.
    useEffect(()=>{
        setIsGameOver(()=>{
            for (let index = 0; index < 8; index++) {
                for (let index2 = 0; index2 < 8; index2++) {
                    if (!CheckIfGameOver(board[index][index2], index2, index)) {
                        return false;
                    }
                }
            }
            return true;
        });

        let newNumberOfPieces = 0;
        for (let index = 0; index < 8; index++) {
            for (let index2 = 0; index2 < 8; index2++) {
                if (board[index][index2]!='') {
                    ++newNumberOfPieces;
                }
            }
        }
        if (newNumberOfPieces==numberOfPieces) {
            moveSound();
        }
        else{
            setNumberOfPieces(newNumberOfPieces);
            captureSound();
        }

    },[board])

    //Utility function that Checks if a particular move leaves king in check and return a bool.
    function CheckIfMoveLeavesKingInCheck(selectedX, selectedY, Xpos, Ypos){
        let enPassant = ((board[selectedY][selectedX]=='p' || board[selectedY][selectedX]=="P") && board[Ypos][Xpos]=='' && (Math.abs(Xpos-selectedX)+ Math.abs(Ypos-selectedY))==2);
            let hold = board[selectedY][selectedX];
            let newboard = board.map((row, rowIndex) => (
                row.map((piece, colIndex) => {
                    if (colIndex == Xpos && rowIndex == Ypos) {
                        return hold;
                    }
                    else if (colIndex == selectedX && rowIndex == selectedY) {
                        return '';
                    }
                    else if(enPassant && hold=='p' && colIndex==Xpos && rowIndex==Ypos-1){ //enpassant black pawn
                        return '';
                    }
                    else if(enPassant && hold=='P' && colIndex==Xpos && rowIndex==Ypos+1){ //enpassant white pawn
                        return '';
                    }
                    else{
                        return piece;
                    }
                })
            ))
            if (!isWhiteTurn) {
                return (isBlackKingInCheck(blackKingPosition.X, blackKingPosition.Y, newboard));
            }
            else{
                return(isWhiteKingInCheck(whiteKingPosition.X, whiteKingPosition.Y, newboard));
            }
    }
    
    //Utility function that runs in a loop in to check each and every square to see if a move is possible or not.
    function CheckIfGameOver(piece, Xpos, Ypos) {
        let possibleMovesBoard = [
            [false, false, false, false, false, false, false, false],
            [false, false, false, false, false, false, false, false],
            [false, false, false, false, false, false, false, false],
            [false, false, false, false, false, false, false, false],
            [false, false, false, false, false, false, false, false],
            [false, false, false, false, false, false, false, false],
            [false, false, false, false, false, false, false, false],
            [false, false, false, false, false, false, false, false]
        ];
        
        if (piece == '') {
            return true;
        } else if (isWhiteTurn) {
            if (piece == 'P') {
                possibleMovesBoard = possibleMovesBoard.map((row, rowIndex) => (row.map((piece, colIndex) => !CheckIfMoveLeavesKingInCheck(Xpos, Ypos, colIndex, rowIndex) && WhitePawn(Xpos, Ypos, colIndex, rowIndex, board, lastMove))))
            } else if (piece == 'R') {
                possibleMovesBoard = WhiteRook(Xpos, Ypos, board, possibleMovesBoard).map((row, rowIndex) => (row.map((val, colIndex) => !CheckIfMoveLeavesKingInCheck(Xpos, Ypos, colIndex, rowIndex) && val)));
            } else if (piece == 'N') {
                possibleMovesBoard = possibleMovesBoard.map((row, rowIndex) => (row.map((piece, colIndex) => !CheckIfMoveLeavesKingInCheck(Xpos, Ypos, colIndex, rowIndex) && WhiteKnight(Xpos, Ypos, colIndex, rowIndex, board))))
            } else if (piece == 'B') {
                possibleMovesBoard = WhiteBishop(Xpos, Ypos, board, possibleMovesBoard).map((row, rowIndex) => (row.map((val, colIndex) => !CheckIfMoveLeavesKingInCheck(Xpos, Ypos, colIndex, rowIndex) && val)));
            } else if (piece == 'Q') {
                possibleMovesBoard = WhiteQueen(Xpos, Ypos, board, possibleMovesBoard).map((row, rowIndex) => (row.map((val, colIndex) => !CheckIfMoveLeavesKingInCheck(Xpos, Ypos, colIndex, rowIndex) && val)));
            } else if (piece == 'K') {
                possibleMovesBoard = possibleMovesBoard.map((row, rowIndex) => (row.map((piece, colIndex) => WhiteKing(Xpos, Ypos, colIndex, rowIndex, board))))
                if (!isWhiteKingInCheck(whiteKingPosition.X, whiteKingPosition.Y, board)) {
                    if (!didThisKingMove[1] && !didThisRookMove[2] && board[7][6] == '' && !isWhiteKingInCheck(6, 7, board) && possibleMovesBoard[7][5]) {
                        possibleMovesBoard[7][6] = true;
                    }
                    if (!didThisKingMove[1] && !didThisRookMove[3] && board[7][1] == '' && board[7][2] == '' && !isWhiteKingInCheck(2, 7, board) && possibleMovesBoard[7][3]) {
                        possibleMovesBoard[7][2] = true;
                    }
                }
            }
        } else {
            if (piece == 'p') {
                possibleMovesBoard = possibleMovesBoard.map((row, rowIndex) => (row.map((piece, colIndex) => !CheckIfMoveLeavesKingInCheck(Xpos, Ypos, colIndex, rowIndex) && BlackPawn(Xpos, Ypos, colIndex, rowIndex, board, lastMove))))
                
            } else if (piece == 'r') {
                possibleMovesBoard = BlackRook(Xpos, Ypos, board, possibleMovesBoard).map((row, rowIndex) => (row.map((val, colIndex) => !CheckIfMoveLeavesKingInCheck(Xpos, Ypos, colIndex, rowIndex) && val)));
            } else if (piece == 'n') {
                possibleMovesBoard = possibleMovesBoard.map((row, rowIndex) => (row.map((piece, colIndex) => !CheckIfMoveLeavesKingInCheck(Xpos, Ypos, colIndex, rowIndex) && BlackKnight(Xpos, Ypos, colIndex, rowIndex, board))))
            } else if (piece == 'b') {
                possibleMovesBoard = BlackBishop(Xpos, Ypos, board, possibleMovesBoard).map((row, rowIndex) => (row.map((val, colIndex) => !CheckIfMoveLeavesKingInCheck(Xpos, Ypos, colIndex, rowIndex) && val)));
            } else if (piece == 'q') {
                possibleMovesBoard = BlackQueen(Xpos, Ypos, board, possibleMovesBoard).map((row, rowIndex) => (row.map((val, colIndex) => !CheckIfMoveLeavesKingInCheck(Xpos, Ypos, colIndex, rowIndex) && val)));
            } else if (piece == 'k') {
                possibleMovesBoard = possibleMovesBoard.map((row, rowIndex) => (row.map((piece, colIndex) => BlackKing(Xpos, Ypos, colIndex, rowIndex, board))))
                if (!isBlackKingInCheck(blackKingPosition.X, blackKingPosition.Y, board)) {
                    if (!didThisKingMove[0] && !didThisRookMove[1] && board[0][6] == '' && !isBlackKingInCheck(6, 0, board) && possibleMovesBoard[0][5]) {
                        possibleMovesBoard[0][6] = true;
                    }
                    if (!didThisKingMove[0] && !didThisRookMove[0] && board[0][1] == '' && board[0][2] == '' && !isBlackKingInCheck(2, 0, board) && possibleMovesBoard[0][3]) {
                        possibleMovesBoard[0][2] = true;
                    }
                }
            }
        }
        
        for (let index = 0; index < 8; index++) {
            for (let index2 = 0; index2 < 8; index2++) {
                if (possibleMovesBoard[index][index2]) {
                    return false;
                }
            }
        }
        return true;
    }
    
    //Moves pieces and sets the board accordingly.
    function movePiece(Xpos, Ypos){
        if (movesBoard[Ypos][Xpos] && selectedPiece != null) {
            let enPassant = ((board[selectedPiece.Y][selectedPiece.X]=='p' || board[selectedPiece.Y][selectedPiece.X]=="P") && board[Ypos][Xpos]=='' && (Math.abs(Xpos-selectedPiece.X)+ Math.abs(Ypos-selectedPiece.Y))==2);
            let whiteKingCastlingShort = (board[selectedPiece.Y][selectedPiece.X] == 'K' && Xpos-selectedPiece.X==2);
            let whiteKingCastlingLong = (board[selectedPiece.Y][selectedPiece.X] == 'K' && selectedPiece.X-Xpos==2);
            let blackKingCastlingShort = (board[selectedPiece.Y][selectedPiece.X] == 'k' && Xpos-selectedPiece.X==2);
            let blackKingCastlingLong = (board[selectedPiece.Y][selectedPiece.X] == 'k' && selectedPiece.X-Xpos==2);

            setIsPrommoting((board[selectedPiece.Y][selectedPiece.X]=='p' || board[selectedPiece.Y][selectedPiece.X]=="P") && (Ypos == 0 || Ypos == 7)); 

            if (board[selectedPiece.Y][selectedPiece.X] == 'k') {
                setBlackKingPosition({Y:Ypos, X:Xpos});
            }
            else if (board[selectedPiece.Y][selectedPiece.X] == 'K') {
                setWhiteKingPosition({Y:Ypos, X:Xpos});
            }
            
            if ((Xpos == 0 && Ypos == 0) || (selectedPiece.X == 0 && selectedPiece.Y==0) ) {
                setDidThisRookMove(prev => prev.map((val,index)=>{if (index == 0) {return true} else{return val}}));
            }
            else if ((Xpos == 7 && Ypos == 0) || (selectedPiece.X == 7 && selectedPiece.Y==0) ) {
                setDidThisRookMove(prev => prev.map((val,index)=>{if (index == 1) {return true} else{return val}}));
            }
            else if ((Xpos == 7 && Ypos == 7) || (selectedPiece.X == 7 && selectedPiece.Y==7) ) {
                setDidThisRookMove(prev => prev.map((val,index)=>{if (index == 2) {return true} else{return val}}));
            }
            else if ((Xpos == 0 && Ypos == 7) || (selectedPiece.X == 0 && selectedPiece.Y==7) ) {
                setDidThisRookMove(prev => prev.map((val,index)=>{if (index == 3) {return true} else{return val}}));
            }
            else if ((Xpos == 4 && Ypos == 0) || (selectedPiece.X == 4 && selectedPiece.Y== 0) ) {
                setDidThisKingMove(prev => prev.map((val,index)=>{if (index == 0) {return true} else{return val}}));
            }
            else if ((Xpos == 4 && Ypos == 7) || (selectedPiece.X == 4 && selectedPiece.Y==7) ) {
                setDidThisKingMove(prev => prev.map((val,index)=>{if (index == 1) {return true} else{return val}}));
            }



            setLastMove({piece: board[selectedPiece.Y][selectedPiece.X], from:{X:selectedPiece.X, Y:selectedPiece.Y}, to:{X:Xpos, Y:Ypos}});
            
            setBoard(prevBoard =>{
                let hold = prevBoard[selectedPiece.Y][selectedPiece.X];
                let newboard = prevBoard.map((row, rowIndex) => (
                    row.map((piece, colIndex) => {
                        if (colIndex == Xpos && rowIndex == Ypos) {
                            return hold;
                        }
                        else if (colIndex == selectedPiece.X && rowIndex == selectedPiece.Y) {
                            return '';
                        }
                        else if(enPassant && hold=='p' && colIndex==Xpos && rowIndex==Ypos-1){ //enpassant black pawn
                            return '';
                        }
                        else if(enPassant && hold=='P' && colIndex==Xpos && rowIndex==Ypos+1){ //enpassant white pawn
                            return '';
                        }
                        else if(whiteKingCastlingShort && colIndex == 5 && rowIndex == 7){
                            return 'R';
                        }
                        else if(whiteKingCastlingShort && colIndex == 7 && rowIndex == 7){
                            return '';
                        }
                        else if(whiteKingCastlingLong && colIndex == 3 && rowIndex == 7){
                            return 'R';
                        }
                        else if(whiteKingCastlingLong && colIndex == 0 && rowIndex == 7){
                            return '';
                        }
                        else if(blackKingCastlingShort && colIndex == 5 && rowIndex == 0){
                            return 'r';
                        }
                        else if(blackKingCastlingShort && colIndex == 7 && rowIndex == 0){
                            return '';
                        }
                        else if(blackKingCastlingLong && colIndex == 3 && rowIndex == 0){
                            return 'r';
                        }
                        else if(blackKingCastlingLong && colIndex == 0 && rowIndex == 0){
                            return '';
                        }
                        else{
                            return piece;
                        }
                    })
                ))
                if (isWhiteTurn) {
                    setIsInCheck(isBlackKingInCheck(blackKingPosition.X, blackKingPosition.Y, newboard));
                }
                else{
                    setIsInCheck(isWhiteKingInCheck(whiteKingPosition.X, whiteKingPosition.Y, newboard));
                }
                return newboard;
            })
            
            setMovesBoard((prevBoard)=>{
                let newBoard = prevBoard.map((row) => (row.map(() => {return false;})))
                return newBoard;
            });

            setIsWhiteTurn(prev=>!prev);
        }
    }

    //Either updates the movesBoard state according to the clicked on square or triggers the movepiece function.
    function updateData (piece, Xpos, Ypos){
        if(movesBoard[Ypos][Xpos]){
            movePiece(Xpos, Ypos);
        }
        else{
            setMovesBoard((prevBoard)=>{
                let newBoard = prevBoard.map((row) => (row.map(() => {return false;})))
                return newBoard;
            });
            if (isWhiteTurn) {
                if (piece == 'P') {
                    setMovesBoard((prevBoard)=>{
                        let newBoard = prevBoard.map((row, rowIndex) => (row.map((piece, colIndex) => !CheckIfMoveLeavesKingInCheck(Xpos, Ypos, colIndex, rowIndex) && WhitePawn(Xpos, Ypos, colIndex, rowIndex, board, lastMove))))
                        return newBoard;
                    });
                    setSelectedPiece({X:Xpos, Y:Ypos});
    
                    
                }
                else if(piece == 'R'){

                    setMovesBoard(prevBoard =>  WhiteRook(Xpos, Ypos, board, prevBoard).map((row,rowIndex)=>(row.map((val, colIndex) => !CheckIfMoveLeavesKingInCheck(Xpos, Ypos, colIndex, rowIndex) && val ))));
                    setSelectedPiece({X:Xpos, Y:Ypos});
                }
                else if(piece == 'N'){
                    setMovesBoard((prevBoard)=>{
                        let newBoard = prevBoard.map((row, rowIndex) => (row.map((piece, colIndex) => !CheckIfMoveLeavesKingInCheck(Xpos, Ypos, colIndex, rowIndex) && WhiteKnight(Xpos, Ypos, colIndex, rowIndex, board))))
                        return newBoard;
                    });
    
                    setSelectedPiece({X:Xpos, Y:Ypos});
                }
                else if(piece=='B'){
                    setMovesBoard(prevBoard =>  WhiteBishop(Xpos, Ypos, board, prevBoard).map((row,rowIndex)=>(row.map((val, colIndex) => !CheckIfMoveLeavesKingInCheck(Xpos, Ypos, colIndex, rowIndex) && val ))));
                    setSelectedPiece({X:Xpos, Y:Ypos});
                }
                else if(piece == 'Q'){
                    setMovesBoard(prevBoard =>  WhiteQueen(Xpos, Ypos, board, prevBoard).map((row,rowIndex)=>(row.map((val, colIndex) => !CheckIfMoveLeavesKingInCheck(Xpos, Ypos, colIndex, rowIndex) && val ))));
                    setSelectedPiece({X:Xpos, Y:Ypos});
                }
                else if(piece == 'K'){
                    setMovesBoard((prevBoard)=>{
                        let newBoard = prevBoard.map((row, rowIndex) => (row.map((piece, colIndex) => WhiteKing(Xpos, Ypos, colIndex, rowIndex, board))))
                        
                        if (!isWhiteKingInCheck(whiteKingPosition.X, whiteKingPosition.Y, board)) {   
                            if (!didThisKingMove[1] && !didThisRookMove[2] && board[7][6]=='' && !isWhiteKingInCheck(6,7,board) && newBoard[7][5]) {
                                newBoard[7][6] = true;
                            }
                            if (!didThisKingMove[1] && !didThisRookMove[3] && board[7][1]=='' && board[7][2]=='' && !isWhiteKingInCheck(2,7,board) && newBoard[7][3]) {
                                newBoard[7][2] = true;
                            }
                        }
                            


                        return newBoard;
                    });
    
                    setSelectedPiece({X:Xpos, Y:Ypos});
                }
            }
            else{
                if (piece == 'p'){
                    setMovesBoard((prevBoard)=>{
                        let newBoard = prevBoard.map((row, rowIndex) => (row.map((piece, colIndex) => !CheckIfMoveLeavesKingInCheck(Xpos, Ypos, colIndex, rowIndex) && BlackPawn(Xpos, Ypos, colIndex, rowIndex, board, lastMove))))
                            return newBoard;
                    });

                    setSelectedPiece({X:Xpos, Y:Ypos});
                }
            
                else if(piece=='r'){
                    setMovesBoard(prevBoard =>  BlackRook(Xpos, Ypos, board, prevBoard).map((row,rowIndex)=>(row.map((val, colIndex) => !CheckIfMoveLeavesKingInCheck(Xpos, Ypos, colIndex, rowIndex) && val ))));
                    setSelectedPiece({X:Xpos, Y:Ypos});
                }
                
                else if(piece == 'n'){
                    setMovesBoard((prevBoard)=>{
                        let newBoard = prevBoard.map((row, rowIndex) => (row.map((piece, colIndex) => !CheckIfMoveLeavesKingInCheck(Xpos, Ypos, colIndex, rowIndex) && BlackKnight(Xpos, Ypos, colIndex, rowIndex, board))))
                        return newBoard;
                    });

                    setSelectedPiece({X:Xpos, Y:Ypos});
                }
                
                else if(piece=='b'){
                    setMovesBoard(prevBoard =>  BlackBishop(Xpos, Ypos, board, prevBoard).map((row,rowIndex)=>(row.map((val, colIndex) => !CheckIfMoveLeavesKingInCheck(Xpos, Ypos, colIndex, rowIndex) && val ))));
                    setSelectedPiece({X:Xpos, Y:Ypos});
                }
                
                else if(piece == 'q'){
                    setMovesBoard(prevBoard =>  BlackQueen(Xpos, Ypos, board, prevBoard).map((row,rowIndex)=>(row.map((val, colIndex) => !CheckIfMoveLeavesKingInCheck(Xpos, Ypos, colIndex, rowIndex) && val ))));
                    setSelectedPiece({X:Xpos, Y:Ypos});
                }
                
                else if(piece == 'k'){
                    setMovesBoard((prevBoard)=>{
                        let newBoard = prevBoard.map((row, rowIndex) => (row.map((piece, colIndex) => BlackKing(Xpos, Ypos, colIndex, rowIndex, board))))
                        if (!isBlackKingInCheck(blackKingPosition.X, blackKingPosition.Y, board)) {   
                            if (!didThisKingMove[0] && !didThisRookMove[1] && board[0][6]=='' && !isBlackKingInCheck(6,0,board) && newBoard[0][5]) {
                                newBoard[0][6] = true;
                            }
                            if (!didThisKingMove[0] && !didThisRookMove[0] && board[0][1]=='' && board[0][2]=='' && !isBlackKingInCheck(2,0,board) && newBoard[0][3]) {
                                newBoard[0][2] = true;
                            }
                        }
                        
                        return newBoard;
                    });

                    setSelectedPiece({X:Xpos, Y:Ypos});
                }
            }
        }
    }

  return (
    <div>
            <DndContext onDragEnd={handleOnDragEnd} onDragStart={handleOnDragStart}>
                <div className= "aspect-square grid grid-cols-8 grid-rows-[8] bg-gray-300 relative touch-none" style={{width:`${boardSize}px`, height:`${boardSize}px`}}>
                    {board.map((row, rowIndex) => (
                        row.map((piece, colIndex) => (
                            <div key={colIndex} className={(rowIndex+colIndex)%2? "bg-gray-700 relative":"bg-gray-400 relative"} >
                                {isInCheck && (isWhiteTurn? (rowIndex == whiteKingPosition.Y && colIndex == whiteKingPosition.X): (rowIndex==blackKingPosition.Y && colIndex==blackKingPosition.X)) 
                                && <div className="absolute inset-0 border-4 border-red-800"/>}
                                <ChessSquare piece={piece} movable={movesBoard[rowIndex][colIndex]} id={`${rowIndex}${colIndex}`} squareSize={squareSize}/>
                            </div>
                        ))
                    ))}
                <div className="absolute -bottom-2 -right-2 rounded-full w-4 h-4 bg-neutral-500 hover:cursor-pointer hover:scale-110 transition-transform touch-auto" draggable="true" onDragStart={StartResize} onDrag={ResizeBoard} onDragEnd={ResizeBoard}/>

                    {isPrommoting && 
                        <div className="absolute h-full w-full" >
                            <div className="absolute w-32 h-72 flex flex-col items-center justify-around bg-neutral-300 rounded-lg p-5 inset-0 mx-auto my-auto" >
                                {(lastMove.piece == 'P')
                                ? whitePromotion.map((PromotionPiece)=>(
                                    <div onClick={()=>{
                                        setBoard( prevBoard => {
                                            let newboard = prevBoard.map((row, rowIndex) => (
                                                row.map((piece, colIndex)=>{
                                                    if(colIndex == lastMove.to.X && rowIndex==lastMove.to.Y){
                                                        return PromotionPiece;
                                                    }
                                                    else{
                                                        return piece;
                                                    }
                                                })
                                            ))
                                            if (!isWhiteTurn) {
                                                setIsInCheck(isBlackKingInCheck(blackKingPosition.X, blackKingPosition.Y, newboard));
                                            }
                                            else{
                                                setIsInCheck(isWhiteKingInCheck(whiteKingPosition.X, whiteKingPosition.Y, newboard));
                                            }
                                            return newboard;
                                        })
                                        setIsPrommoting(false);
                                    }} 
                                    key={PromotionPiece}>
                                        {ChoosePiece(PromotionPiece,50)}
                                    </div>
                                ))
                                : blackPromotion.map((PromotionPiece)=>(
                                    <div onClick={()=>{
                                        setBoard( prevBoard => {
                                            let newboard = prevBoard.map((row, rowIndex) => (
                                                row.map((piece, colIndex)=>{
                                                    if(colIndex == lastMove.to.X && rowIndex==lastMove.to.Y){
                                                        return PromotionPiece;
                                                    }
                                                    else{
                                                        return piece;
                                                    }
                                                })
                                            ))
                                            if (!isWhiteTurn) {
                                                setIsInCheck(isBlackKingInCheck(blackKingPosition.X, blackKingPosition.Y, newboard));
                                            }
                                            else{
                                                setIsInCheck(isWhiteKingInCheck(whiteKingPosition.X, whiteKingPosition.Y, newboard));
                                            }
                                            return newboard;
                                        })
                                        setIsPrommoting(false);
                                    }} 
                                    key={PromotionPiece}>
                                        {ChoosePiece(PromotionPiece,50)}
                                    </div>
                                ))
                                }
                            </div>
                        </div>
                    }


                    {isGameOver && 
                    <div className="absolute w-full h-full flex justify-center items-center">
                        <div className="w-[60%] h-[60%] bg-white flex flex-col gap-4 justify-center items-center rounded-3xl border-2 border-sky-900">
                            <div className="text-black font-bold text-2xl"> {isInCheck?isWhiteTurn?"Black Won!":"White Won!":"It's a Draw!"} </div>
                            <button onClick={newGame} className="w-1/2 h-14 bg-sky-900 font-bold rounded-3xl">New Game</button>
                        </div>
                    </div>
                    }
                </div>

            </DndContext>
    </div>
  )


  //Active is the dragged piece while Over is the droppable container.
  function handleOnDragEnd(event){
    const rowIndex = parseInt(event.over.id[0]);
    const colIndex = parseInt(event.over.id[1]);
    if (movesBoard[rowIndex][colIndex] || event.over.id == event.active.id) {
        updateData(board[rowIndex][colIndex], colIndex, rowIndex)
    }
    else{

        setMovesBoard((prevBoard)=>{
            let newBoard = prevBoard.map((row) => (row.map(() => {return false;})))
            return newBoard;
        });
    }
    
  }

  function handleOnDragStart(event){
    const rowIndex = parseInt(event.active.id[0]);
    const colIndex = parseInt(event.active.id[1]);
    updateData(board[rowIndex][colIndex], colIndex, rowIndex)
  }

}

