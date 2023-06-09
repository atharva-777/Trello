"use client";
import { useBoardStore } from "@/store/BoardStore";
import React, { useEffect } from "react";
import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";
import Cols from "./Cols";
import { todo } from "node:test";
const Board = () => {
  const [board, getBoard, setBoardState, updateTodoInDB] = useBoardStore(
    (state) => [state.board, state.getBoard, state.setBoardState,state.updateTodoInDB]
  );

  useEffect(() => {
    getBoard();
  }, [getBoard]);

  const handleOnDragEnd = (result: DropResult) => {
    const { destination, source, type } = result;
    if (!destination) return;
    // Handling column drag
    if (type === "column") {
      const entries = Array.from(board.columns.entries());
      const [removed] = entries.splice(source.index, 1);
      entries.splice(destination.index, 0, removed);
      const rearrangedCols = new Map(entries);
      setBoardState({ ...board, columns: rearrangedCols });
    }

    const columns = Array.from(board.columns)
    const startColIndex = columns[Number(source.droppableId)];
    const finishColIndex = columns[Number(destination.droppableId)];

    const startCol : Column={
      id : startColIndex[0],
      todos : startColIndex[1].todos,
    };
    const finishCol : Column={
      id : finishColIndex[0],
      todos : finishColIndex[1].todos,
    }
    if(!startCol || !finishCol)return;

    if(source.index === destination.index && startCol===finishCol)return;

    const newTodos = startCol.todos;
    const [todoMoved] = newTodos.splice(source.index,1);
    if(startCol.id===finishCol.id){
      // same column drag
      newTodos.splice(destination.index,0,todoMoved);
      const newCol = {
        id : startCol.id,
        todos : newTodos,
      }
      const newColumn = new Map(board.columns)
      newColumn.set(startCol.id,newCol)
      setBoardState({...board,columns:newColumn});
    } else{
     const finishTodos = Array.from(finishCol.todos);
     finishTodos.splice(destination.index,0,todoMoved);
      const newCol = {
        id : startCol.id,
        todos : newTodos,
      }
      const newColumn = new Map(board.columns)

      newColumn.set(startCol.id,newCol); 
      newColumn.set(finishCol.id,{id:finishCol.id,todos:finishTodos})
      // update in db to save changes
      updateTodoInDB(todoMoved,finishCol.id);
      setBoardState({...board,columns:newColumn})
    }
  };

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="droppable" direction="horizontal" type="column">
        {(provided) => (
          <div
            className="grid grid-cols-1 md:grid-cols-3 max-w-7xl mx-auto gap-5"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {/* first droppable which rearrnge in a row */}

            {Array.from(board.columns.entries()).map(([id, column], index) => (
              <Cols key={id} id={id} todos={column.todos} index={index} />
            ))}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default Board;
