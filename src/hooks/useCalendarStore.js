import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { calendarApi } from "../api";
import { convertEventsToDateEvents } from "../helpers";
import { onAddNewEvent, onDeleteEvent, onLoadEvent, onSetActiveEvent, onUpDateEvent } from "../store";


export const useCalendarStore = () => {

    const dispatch = useDispatch();
    const { events, activeEvent } = useSelector(state => state.calendar);
    const { user } = useSelector(state => state.auth);


    const setActiveEvent = ( calendarEvent ) => {
        dispatch( onSetActiveEvent(calendarEvent))
    }

    const starSavingEvent = async( calendarEvent) => {
        // TODO: update events
        try {
            if (calendarEvent.id) {
            //actualizando
            await calendarApi.put(`/events/${calendarEvent.id}`, calendarEvent);
            dispatch( onUpDateEvent( {...calendarEvent, user} ) );
            return;
            }
        
            //creando
            const {data} = await calendarApi.post('/events', calendarEvent);
            console.log(data)
            dispatch(onAddNewEvent({...calendarEvent, id: data.evento.id, user }));

        } catch (error) {
            console.log(error);
            Swal.fire({
                title: 'Error al Guardar!',
                text: error.response.data?.msj,
                icon: 'error',
                confirmButtonText: 'OK'
              })
        }
        
        
    }

    const starDeleteEvent = async() => {
        //todo bakend
        try {
            await calendarApi.delete(`/events/${activeEvent.id}`);
        
            dispatch( onDeleteEvent());

        } catch (error) {
            console.log(error);
            Swal.fire({
                title: 'Error al eliminar!',
                text: error.response.data?.msj,
                icon: 'error',
                confirmButtonText: 'OK'
              })
        }
        
    }

    const starLoadingEvent = async() => {
        //todo bakend
        try {
            const {data} = await calendarApi.get('/events')
            const events = convertEventsToDateEvents(data.eventos);
            dispatch( onLoadEvent(events));
           
        } catch (error) {
            console.log(error)
            
        }
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
        starLoadingEvent,
  }
}
