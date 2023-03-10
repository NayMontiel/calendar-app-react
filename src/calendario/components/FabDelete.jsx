import { useCalendarStore } from '../../hooks';



export const FabDelete = () => {

  

  const { starDeleteEvent, hasEventSelected } = useCalendarStore();

  const handleDelete = () => {
    starDeleteEvent()
  }


  return (
    <button className='btn btn-danger fab-delete' onClick={handleDelete} 
      style={{ display: hasEventSelected ? '' : 'none'}}>
        <i className='fas fa-trash-alt'></i>
    </button>
  )
}
