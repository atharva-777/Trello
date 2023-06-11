"use client";

import getURL from "@/lib/getURL";
import { useBoardStore } from "@/store/BoardStore";
import { XCircleIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { DraggableProvidedDraggableProps } from "react-beautiful-dnd";

type Props = {
  todo: Todo;
  id: TypedColumn;
  index: number;
  innerRef: (element: HTMLElement | null) => void;
  draggableProps: DraggableProvidedDraggableProps;
  dragHandleProps: DraggableProvidedDraggableProps | null | undefined;
};

const TodoCard = ({
  todo,
  index,
  id,
  innerRef,
  draggableProps,
  dragHandleProps,
}: Props) => {
  const [deleteTask] = useBoardStore((state) => [state.deleteTask]);

  const handleDelete = () => {
    deleteTask(index, todo, id);
  };

  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    if (todo.image) {
      const fetchImage = async () => {
        const url = await getURL(todo.image!);
        if (url) {
          setImageUrl(url.toString());
        }
      };
    }
  }, [todo]);

  return (
    <div
      {...draggableProps}
      {...dragHandleProps}
      ref={innerRef}
      className="bg-white rounded-md space-y-2 drop-shadow-md"
    >
      <div className="flex justify-between items-center p-5">
        <p>{todo.title}</p>
        <button
          className="text-red-500 hover:text-red-600"
          onClick={() => handleDelete()}
        >
          <XCircleIcon className="h-8 w-8 ml-5" />
        </button>
      </div>

      {/* add image here */}
       {imageUrl && (

        <div className="h-full w-full rounded-b-md">
          <Image
          src={imageUrl}
          alt="Task Image"
          width={400}
          height={200}
          className="w-full object-contain rounded-b-md"
          />
        </div>

       )}
    </div>
  );
};

export default TodoCard;
