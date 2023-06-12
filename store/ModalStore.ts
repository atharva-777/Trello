import {create} from 'zustand'

interface ModalState {
  isOpean: boolean;
  openModal: () => void;
  closeModal: () => void;
}

export const useModalState =  create<ModalState>((set)=>({
    isOpean : false,
    openModal : ()=>set({isOpean:true}),
    closeModal: ()=>set({isOpean:false}),
}));