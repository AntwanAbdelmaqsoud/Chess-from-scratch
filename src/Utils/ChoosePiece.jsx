import {FaChessPawn, FaChessRook, FaChessKnight, FaChessBishop, FaChessKing, FaChessQueen} from "react-icons/fa"



export default function ChoosePiece(piece, size){
    if (piece=='p') {
        return <FaChessPawn size={size} color='black'/>
    }
    else if (piece=='r') {
        return <FaChessRook size={size} color='black'/>
    }
    else if (piece=='n') {
        return <FaChessKnight size={size} color='black'/>
    }
    else if (piece=='b') {
        return <FaChessBishop size={size} color='black'/>
    }
    else if (piece=='k') {
        return <FaChessKing size={size} color='black'/>
    }
    else if (piece=='q') {
        return <FaChessQueen size={size} color='black'/>
    }
    else if (piece=='P') {
        return <FaChessPawn size={size} color='white'/>
    }
    else if (piece=='R') {
        return <FaChessRook size={size} color='white'/>
    }
    else if (piece=='N') {
        return <FaChessKnight size={size} color='white'/>
    }
    else if (piece=='B') {
        return <FaChessBishop size={size} color='white'/>
    }
    else if (piece=='K') {
        return <FaChessKing size={size} color='white'/>
    }
    else if (piece=='Q') {
        return <FaChessQueen size={size} color='white'/>
    }
    else{
        return <></>
    }
}