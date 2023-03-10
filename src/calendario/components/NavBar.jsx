import React from 'react'

export const NavBar = () => {
  return (
    <div className='navbar navbar-primary bg-primary mb-4 px-4'>
        <span className='navbar-brand text-white'>
            <i className='fas fa-calendar-alt px-2'></i>

            Nay Montiel
        </span>

        <button className='btn btn-outline-danger fw-bold'>
            <i className='fas fa-sign-out-alt'></i>
            <span>
                Salir
            </span>
        </button>
        
    </div>
  )
}
