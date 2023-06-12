import { create } from "zustand";
import { getTodosGroupedByColumn } from "@/lib/getTodosGroupedByColumn";
import { ID,databases, storage } from "@/appwrite";
import uploadImage from "@/lib/uploadImage";


interface BoardState {
  board: Board;
  getBoard: () => void;
  setBoardState: (board: Board) => void;
  updateTodoInDB: (todo: Todo, columnId: TypedColumn) => void;
  searchString: string;
  setSearchString: (searchString: string) => void;
  image: File | null;
  setImage: (image:File|null) => void;

  deleteTask: (taskIndex: number, todoId: Todo, id: TypedColumn) => void;

  newTaskInput: string;
  setNewTaskInput: (newTask: string) => void;

  newTaskType: TypedColumn;
  setNewTaskType: (newTaskType: TypedColumn) => void;

  addTask: (todo:string,columnId:TypedColumn,image?:File|null)=> void;
}

export const useBoardStore = create<BoardState>((set, get) => ({
  board: {
    columns: new Map<TypedColumn, Column>(),
  },
  getBoard: async () => {
    const board = await getTodosGroupedByColumn();
    set({ board });
  },
  setBoardState: (board) => set({ board }),

  deleteTask: async (taskIndex: number, todo: Todo, id: TypedColumn) => {
    const newColumns = new Map(get().board.columns);
    // delete todoID from newColumns
    newColumns.get(id)?.todos.splice(taskIndex, 1);
    set({ board: { columns: newColumns } });

    if (todo.image) {
      await storage.deleteFile(todo.image.bucketId, todo.image.fileId);
    }

    await databases.deleteDocument(
      process.env.NEXT_PUBLIC_TRELLO_DATABASE_ID!,
      process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!,
      todo.$id
    );
  },

  updateTodoInDB: async (todo, columnId) => {
    await databases.updateDocument(
      process.env.NEXT_PUBLIC_TRELLO_DATABASE_ID!,
      process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!,
      todo.$id,
      {
        title: todo.title,
        status: columnId,
      }
    );
  },
  searchString: "",
  newTaskInput: "",
  setSearchString: (searchString: string) => set({ searchString }),
  setNewTaskInput: (newTaskInput: string) =>
    set({ newTaskInput: newTaskInput }),
  newTaskType: "todo",
  setNewTaskType: (input: TypedColumn) => set({ newTaskType: input }),

  image: null,
  setImage: (image: File | null) => set({ image: image }),


  addTask: async (todo: string, columnId: TypedColumn, image?: File | null) =>
    {
      let file : Image|undefined;

      // upload image of new task
      if(image){
        const fileUploaded = await uploadImage(image);
        if(fileUploaded){
          file = {
            bucketId: fileUploaded.bucketId,
            fileId : fileUploaded.$id,
          };
        }
      }

      // add task by creating new document
      const {$id} = await databases.createDocument(
        process.env.NEXT_PUBLIC_TRELLO_DATABASE_ID!,
        process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!,
        ID.unique(),
        {
          title : todo,
          status : columnId,
          // add image if exist
          ...(file && {image:JSON.stringify(file)}),
        }
      );

      set({newTaskInput:""});

      set((state)=>{
        const newColumns = new Map(state.board.columns);

        const newTodo: Todo = {
          $id,
          $createdAt: new Date().toString(),
          title: todo,
          status: columnId,
          // add image if exist
          ...(file && { image: (file) }),
        };
        const columns = newColumns.get(columnId);

        if(!columns){
          newColumns.set(columnId,{
            id:columnId,
            todos:[newTodo],
          });
        }else{
          newColumns.get(columnId)?.todos.push(newTodo);
        }
        return {
          board : {
            columns : newColumns,
          }
        }
      })

      

    },
}));
