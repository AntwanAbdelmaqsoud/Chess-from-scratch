import ChoosePiece from "../Utils/ChoosePiece"
import { useDraggable, useDroppable } from "@dnd-kit/core"
import { useEffect, useState, useRef } from 'react'

function BoardSquare({id, squareSize, children}) {
  const {isOver, setNodeRef} = useDroppable({id: id,});
  return (
    <div className="absolute" ref={setNodeRef} style={{width: `${squareSize}px`, height: `${squareSize}px`}}>
      {children}
    </div>
  )
}



export default function ChessSquare({piece, movable,id, squareSize}) {
  const {attributes, listeners, setNodeRef, transform} = useDraggable({
    id: id,
    disabled: piece=="" && !movable,
  });
  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    zIndex: "15",
  } : undefined;


  return (
    <BoardSquare id={id} squareSize={squareSize}>
      <div className="absolute flex items-center justify-center inset-0" ref={setNodeRef} style={style} {...listeners} {...attributes}>
          <div >
          {movable&&(piece==''?<div className="rounded-full bg-black" style={{width: `${squareSize/5}px`, height: `${squareSize/5}px`}}/>:<div className="absolute inset-0"><div className="absolute inset-0 rounded-full bg-red-500/50"/> </div>) }
          {ChoosePiece(piece,squareSize*0.66)}
          </div>
      </div>
    </BoardSquare>
  )
}
