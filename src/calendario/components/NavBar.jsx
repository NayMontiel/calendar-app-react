import React from 'react'
import { useAuthStore } from '../../hooks';


export const NavBar = () => {

  const {starLogout, user } = useAuthStore();


  return (
    <div className='navbar navbar-primary bg-primary mb-4 px-4'>
        <span className='navbar-brand text-white'>
            <i className='fas fa-calendar-alt px-2'></i>
            &nbsp;
            {user.name}
        </span>

        <button className='btn btn-outline-danger fw-bold' onClick={starLogout}>
            <i className='fas fa-sign-out-alt'></i>
            &nbsp;
            <span>
                Salir
            </span>
        </button>
        
    </div>
  )
}
