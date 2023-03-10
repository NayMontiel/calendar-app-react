import { useDispatch, useSelector } from "react-redux";
import { onAddNewEvent, onDeleteEvent, onSetActiveEvent, onUpDateEvent } from "../store";


export const useCalendarStore = () => {

    const dispatch = useDispatch();

    const { events, activeEvent } = useSelector(state => state.calendar);

    const setActiveEvent = ( calendarEvent ) => {
        dispatch( onSetActiveEvent(calendarEvent))
    }

    const starSavingEvent = async( calendarEvent) => {
        // todo va al bakend

        // todo bien
        if (calendarEvent._id) {
            //actualizando
            dispatch( onUpDateEvent( {...calendarEvent} ) )
        }
        else{
            //creando
            dispatch(onAddNewEvent({...calendarEvent, _id: new Date().getTime() }))
        }
    }

    const starDeleteEvent = () => {
        //todo bakend
        
        dispatch( onDeleteEvent())
    }
 

  return {
    //*propiedades
        events, 
        activeEvent,
        hasEventSelected: !!activeEvent,

    //*método
        setActiveEvent,
        starSavingEvent,
        starDeleteEvent,
  }
}
