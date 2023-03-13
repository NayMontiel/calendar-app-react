import { createSlice } from '@reduxjs/toolkit';


export const calendarSlice = createSlice({
name: 'calendar',
 initialState: {
    isLoadingEvents: true,
    events:[],  //[tempEvent]
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
            state.events = state.events.filter( event => event.id !== state.activeEvent.id)
        state.activeEvent = null;
        }
    },

    onLoadEvent: (state, {payload = []} ) => {
        state.isLoadingEvents = false;
        // state.events = action.payload; 
        payload.forEach(event => {
            const exists = state.events.some(dbEvent => dbEvent.id === event.id);
            if (!exists) {
                state.events.push(event)
            }
        });
    },

    onLogoutCalendar: (state ) => {
        state.isLoadingEvents = true;
        state.events = []; 
        state.activeEvent = null;
        
    },
 }
});
export const { 
    onSetActiveEvent, 
    onAddNewEvent, 
    onUpDateEvent, 
    onDeleteEvent, 
    onLoadEvent, 
    onLogoutCalendar 
} = calendarSlice.actions;