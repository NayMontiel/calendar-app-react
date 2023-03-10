import { createSlice } from '@reduxjs/toolkit';
export const uiSlice = createSlice({
name: 'ui',
 initialState: {
 isDateModalOpen: false
 },
 reducers: {
    //esto es para cuando la persona quiere abrir el modal
    onOpenModal: (state) => {
        state.isDateModalOpen= true;
    },
    //cuando cerramos el modal
    onCloseModal: (state) => {
        state.isDateModalOpen= false;
 },
 }
});
export const { onOpenModal, onCloseModal } = uiSlice.actions;