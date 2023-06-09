import { PlusCircleIcon } from "@heroicons/react/24/solid";
import React from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";

import TodoCard from "./TodoCard";

type Props = {
  id: TypedColumn;
  todos: Todo[];
  index: number;
};

const idToColumnText: {
  [key in TypedColumn]: string;
} = {
  todo: "To Do",
  inprogress: "In Progress",
  done: "Done",
};

const Cols = ({ id, todos, index }: Props) => {
  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          {/* render droppable tasks in column 2nd droppable */}

          <Droppable droppableId={index.toString()} type="card">
            {(provided, snapshot) => (
              <div
                className={`pb-2 p-2 rounded-2xl shadow-sm ${
                  snapshot.isDraggingOver ? "bg-blue-400" : "bg-white/50"
                }`}
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                <h2 className="flex justify-between font-bold text-xl p-2">
                  {idToColumnText[id]}
                  <span className="text-gray-500 bg-gray-200 rounded-full px-2 py-1 text-sm font-normal">
                    {todos.length}
                  </span>
                </h2>

                <div className="space-y-2">
                  {todos.map((todo, index) => (
                    <Draggable
                      draggableId={todo.$id}
                      key={todo.$id}
                      index={index}
                    >
                      {(provided) => (
                        <TodoCard
                          dragHandleProps={provided.dragHandleProps}
                          draggableProps={provided.draggableProps}
                          innerRef={provided.innerRef}
                          todo={todo}
                          index={index}
                          id={id}
                        />
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                  <div className="flex items-end justify-end p-2">
                    <button className="text-green-400 hover:text-green-600">
                      <PlusCircleIcon className="h-10 w-10" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
};

export default Cols;
