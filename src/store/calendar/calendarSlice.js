import { createSlice } from '@reduxjs/toolkit';
import { addHours } from 'date-fns';

const tempEvent = {
    _id: new Date().getTime(),
    title: 'Cumpleaños de Bebito',
    notes: 'Hay que comprar la torta en el lider',
    start: new Date(),
    end: addHours(new Date(), 2),
    bgColor: '#fafafa',
    user: {
      _id: '123',
      name: 'Nay'
    }
  }


export const calendarSlice = createSlice({
name: 'calendar',
 initialState: {
    events: [tempEvent],
    activeEvent: null,
 },
 reducers: {
    onSetActiveEvent: (state, action ) => {
        state.activeEvent = action.payload;
    },

    onAddNewEvent: (state, action ) => {
        state.events.push(action.payload); // para crear la nueva nota 
        state.activeEvent = null; // con esto limpiamos el event
    },

    onUpDateEvent: (state, action ) => {
        state.activeEvent = null;
        state.events = state.events.map(event => { //con esto actualizamos el evento
            if (event.id === action.payload.id) {
                return action.payload;
            }

            return event;
        })
    },

    onDeleteEvent: (state ) => {
        if (state.activeEvent) {
            state.events = state.events.filter( event => event._id !== state.activeEvent._id)
        state.activeEvent = null;
        }
    },
 }
});
export const { onSetActiveEvent, onAddNewEvent, onUpDateEvent, onDeleteEvent } = calendarSlice.actions;