import { useState } from 'react';

import { Calendar } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { NavBar,  CalendarEvent, CalendarModal, FabAddNew, FabDelete } from '../components';
import {getMessages, localizer} from '../../helpers'
import { useCalendarStore, useUiStore } from '../../hooks';


export const CalendarPage = () => {

  const {openDateModal} = useUiStore();
  const { events, setActiveEvent } = useCalendarStore();

  const [lasView, setLasView] = useState(localStorage.getItem('lasView') || 'month')

  const eventStyleGetter = (event, start, end, isSelected) => {
    // console.log({event, start, end, isSelected});

    const style = {
      backgroundColor: '#347CF7',
      borderRadius: '0px',
      opacity: 0.8,
      color: 'white'
    }
    return {
      style
    }
  }

  const onDoubleClick = (event) => {
    // console.log({doubleClick: event})
    openDateModal();
  }
  const onSelect = (event) => {
    // console.log({ click: event})
    setActiveEvent(event)
  }
  const onviewChange = (event) => {
    localStorage.setItem('lasView', event)
    setLasView(event)
  }


  return (
    <>
      <NavBar />

      <Calendar
      culture='es'
      localizer={localizer}
      events={events}
      defaultView={lasView}
      startAccessor="start"
      endAccessor="end"
      style={{ height: 'calc(100vh - 80px)' }}
      messages={getMessages()}
      eventPropGetter={ eventStyleGetter }
      components={{
        event: CalendarEvent
      }}
      onDoubleClickEvent={ onDoubleClick }
      onSelectEvent={ onSelect }
      onView={ onviewChange }
    />

    <CalendarModal />
    <FabAddNew />
    <FabDelete />

    </>
  )
}
