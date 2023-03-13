import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom'
import { LoginPages } from '../auth'
import { CalendarPage } from '../calendario/pages';
import { useAuthStore } from '../hooks';


export const AppRouter = () => {

  // const authStatus = 'no-authenticated'; //no-authenticated
  const {checkAuthToken, status} = useAuthStore();

  useEffect(() => {
    checkAuthToken()
  
  }, [])
  


  if (status === 'checking') {
    return(
      <h3>Cargando....</h3>
    )
  }

  return (
    <Routes>

        {
          (status === 'not-authenticated')
          ? (
            <>
              <Route path='/auth/*' element={<LoginPages />} />
              <Route path='/*' element={<Navigate to='/auth/login' />} />
            </>
          )


          : (
            <>
              <Route path='/' element={<CalendarPage />} />
              <Route path='/*' element={<Navigate to='/' />} />
            </>
          )
        }

        
        
    </Routes>
  )
}
