"use client";

import React from 'react'
import { DraggableProvidedDraggableProps } from 'react-beautiful-dnd';

type Props = {
  todo: Todo;
  id: TypedColumn;
  index: number;
  innerRef: (element: HTMLElement | null) => void;
  draggableProps: DraggableProvidedDraggableProps;
  dragHandleProps : DraggableProvidedDraggableProps|null|undefined;
};

const TodoCard = ({todo,index,id,innerRef,draggableProps,dragHandleProps}:Props) => {
  return (
    <div
    {...draggableProps}
    {...dragHandleProps}
    ref={innerRef}
    className='bg-white rounded-md space-y-2 drop-shadow-md'
    >
        <h1>Task</h1>
    </div>
  )
}

export default TodoCard