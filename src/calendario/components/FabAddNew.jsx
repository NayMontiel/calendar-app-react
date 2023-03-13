import { useCalendarStore, useUiStore } from '../../hooks';
import { addHours } from 'date-fns';


export const FabAddNew = () => {

  const { openDateModal } = useUiStore();

  const { setActiveEvent } = useCalendarStore();

  const handleClick = () => {
    setActiveEvent({
      title: '',
      note: '',
      start: new Date(),
      end: addHours(new Date(), 2),
      user: {
        _id: '123',
        name: 'Nay'
      }
    })
    openDateModal();
  }


  return (
    <button className='btn btn-primary fab' onClick={handleClick}>
        <i className='fas fa-plus'></i>
    </button>
  )
}
