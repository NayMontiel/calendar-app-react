import { useDispatch, useSelector } from "react-redux"
import { onCloseModal, onOpenModal } from "../store/ui/uiSlice";


export const useUiStore = () => {

    const dispatch = useDispatch()
   
 const { isDateModalOpen } = useSelector(state => state.ui);

 const openDateModal = () => {
    dispatch(onOpenModal())
 }

 const closeDateModal = () => {
    dispatch( onCloseModal())
 }


    return {
        //*propiedades
        isDateModalOpen,

        //*metodos
        openDateModal,
        closeDateModal,
    }


}
