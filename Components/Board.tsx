"use client"; 
import {useBoardStore} from '@/store/BoardStore';
import React, { useEffect } from 'react'
import { DragDropContext, Droppable } from "react-beautiful-dnd";
const Board = () => {

  const getBoard = useBoardStore((state)=>state.getBoard);
  useEffect(() => {
    getBoard();
  }, [getBoard])
  
  return (
    <h1 className='text-gray-200 bg-gray-950'>Hello Board</h1>
      // <DragDropContext>
      //   <Droppable droppableId='board' direction='horizontal' type='column'>
      //     {(provided)=>(
      //       <div>
      //         {/* rendering all the columns */}
      //       </div>
      //     )}
      //   </Droppable>

      // </DragDropContext>
  )
}

export default Board