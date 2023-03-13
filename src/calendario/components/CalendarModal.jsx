import { useEffect, useMemo, useState } from "react";
import { addHours, differenceInSeconds } from "date-fns";

import Modal from "react-modal";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import es from 'date-fns/locale/es';
import Swal from "sweetalert2";
import { useCalendarStore, useUiStore } from "../../hooks";

registerLocale('es', es)


const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#root");

export const CalendarModal = () => {

  const {isDateModalOpen, closeDateModal} = useUiStore();
  const {activeEvent, starSavingEvent } = useCalendarStore();
  const [formSubmitted, setFormSubmitted] = useState(false)

  const [formValue, setFormValue] = useState({
    title: '',
    note: '',
    start: new Date(),
    end: addHours(new Date(), 2)
  });

   const titleClass = useMemo(() => {
    if (!formSubmitted) return ''; 

    return (formValue.title.length > 0)
        ? 'is-valid'
        : 'is-invalid';
   
   }, [formValue.title, formSubmitted]);

   useEffect(() => {
     if (activeEvent !== null) {
      setFormValue({...activeEvent})
     }
   
  
   }, [activeEvent])
   

  const onChanged = ({target}) => {
      setFormValue({
        ...formValue, [target.name] : target.value
      })
  }

  const onDateChange = (event, changing) => {
    setFormValue({
      ...formValue, [changing] : event
    })
}


  const onCloseModal = () => {
    console.log("cerrando modal");
     closeDateModal();
  };

  const onSubmit = async(event) => {
    event.preventDefault();

    setFormSubmitted(true)

    const difference = differenceInSeconds(formValue.end, formValue.start);

    if (isNaN(difference) || difference <= 0) {
      Swal.fire({
        title: 'Error!',
        text: 'Fecha Incorrecta, Revise la fecha ingresada',
        icon: 'error',
        confirmButtonText: 'OK'
      })
      return;
    }

    if (formValue.title.length <= 0) return;
    
    console.log(formValue)

    await starSavingEvent(formValue);
    closeDateModal();
    setFormSubmitted(false);


  };


  return (
    <Modal
      isOpen={isDateModalOpen}
      onRequestClose={onCloseModal}
      style={customStyles}
      className="modal text-primary"
      overlayClassName="modal-fondo"
      closeTimeoutMS={200}
    >
      <h1> Nuevo evento </h1>
      <hr />
      <form className="container" onSubmit={ onSubmit } >
        <div className="form-group mb-2">
          <label>Fecha y hora inicio</label>
          <DatePicker 
            selected={formValue.start}
            className="form-control"
            onChange={ (event) => onDateChange(event, 'start')}
            dateFormat='Pp' 
            showTimeSelect // esto sirve para queaparezca la hora es decir si es pm o am
            locale='es'
            timeCaption="Hora"
          />
        </div>

        <div className="form-group mb-2">
          <label>Fecha y hora fin</label>
          <DatePicker 
            minDate={formValue.start} // esto se usa para que la fecha parta desde la del start y no mas atras de esa
            selected={formValue.end}
            className="form-control"
            onChange={(event) => onDateChange(event, 'end')}
            dateFormat='Pp'
            showTimeSelect
            locale='es'
            timeCaption="Hora"
          />
        </div>

        <hr />
        <div className="form-group mb-2">
          <label>Titulo y notas</label>
          <input
            type="text"
            className={`form-control ${titleClass}`}
            placeholder="Título del evento"
            name="title"
            value={formValue.title}
            autoComplete="off"
            onChange={onChanged}
          />
          <small id="emailHelp" className="form-text text-muted">
            Una descripción corta
          </small>
        </div>

        <div className="form-group mb-2">
          <textarea
            type="text"
            className="form-control"
            placeholder="Notas"
            rows="5"
            name="note"
            value={formValue.note}
            onChange={onChanged}
          ></textarea>
          <small id="emailHelp" className="form-text text-muted">
            Información adicional
          </small>
        </div>

        <button type="submit" className="btn btn-outline-primary btn-block">
          <i className="far fa-save"></i>
          <span> Guardar</span>
        </button>
      </form>
    </Modal>
  );
};
