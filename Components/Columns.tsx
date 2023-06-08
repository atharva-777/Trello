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

const Columns = ({ id, todos, index }: Props) => {
  return (
    <Draggable draggableId={id} index={index}>
      {(Provided) => (
        <div
          {...Provided.draggableProps}
          {...Provided.dragHandleProps}
          ref={Provided.innerRef}
        >
          {/* render droppable todos in column*/}

          <Droppable
          droppableId={index.toString()}
          type="card"
          >
            {(Provided,snapshot)=>(
              <div
              className={`pb-2 p-2 rounded-2xl shadow-sm ${snapshot.isDraggingOver?"bg-green-400":"bg-white/50"} bg-green-400`}
              {...Provided.droppableProps}
              ref={Provided.innerRef}
              >
                <h1>{idToColumnText[id]}</h1>

              </div>
            )}
          </Droppable>


          {/* <Droppable droppableId={index.toString()} type="card">
            {(Provided, snapshot) => (
              <div
                {...Provided.droppableProps}
                ref={Provided.innerRef}
                className={`pb-2 p-2 rounded-2xl shadow-sm
                ${snapshot.isDraggingOver ? "bg-green-400" : "bg-white/50"}`}
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
                      key={todo.$id}
                      draggableId={todo.$id}
                      index={index}
                    >
                      {(Provided) => (
                        <TodoCard
                          todo={todo}
                          index={index}
                          id={id}
                          innerRef={Provided.innerRef}
                          draggableProps={Provided.draggableProps}
                          dragHandleProps={Provided.dragHandleProps}
                        />
                      )}
                    </Draggable>
                  ))}
                  {Provided.placeholder}
                  <div className="flex items-end justify-end p-2">
                    <button className="text-green-500 hover:text-green-600">
                      <PlusCircleIcon className="h-10 w-10" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </Droppable> */}


        </div>
      )}
    </Draggable>
  );
};

export default Columns;
