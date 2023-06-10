"use client";
import { useModalState } from "@/store/ModalStore";

import { useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useBoardStore } from "@/store/BoardStore";
import TaskTypeRadioGroup from "./TaskTypeRadioGroup";

export default function Modal() {
  const [isOpen, closeModal] = useModalState((state) => [
    state.isOpean,
    state.closeModal,
  ]);

  const [newTaskInput,setNewTaskInput] = useBoardStore((state)=>[state.newTaskInput,state.setNewTaskInput])

  return (
    // Use the `Transition` component at the root level
    <Transition show={isOpen} as={Fragment} appear>
      <Dialog as="form" onClose={closeModal} className="relative z-10">
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title className="text-lg font-medium leading-6 text-gray-900 pb-2">
                  Add a New Task
                </Dialog.Title>

                <div className="mt-2">
                    <input type="text" value={newTaskInput} onChange={(e)=>setNewTaskInput(e.target.value)}
                    placeholder="Enter a new Task" className="w-full border border-gray-300 rounded-md outline-none p-5" />
                </div>

                {/* Radio Group */}
                <TaskTypeRadioGroup/>

              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
