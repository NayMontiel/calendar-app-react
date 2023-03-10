import { Navigate, Route, Routes } from 'react-router-dom'
import { LoginPages } from '../auth'
import { CalendarPage } from '../calendario/pages';
import { getEnvVariables } from '../helpers';


export const AppRouter = () => {

  const authStatus = 'authenticated'; //no-authenticated

  console.log(getEnvVariables())

  return (
    <Routes>

        {
          (authStatus === 'no-authenticated')
          ? <Route path='/auth/*' element={<LoginPages />} />
          : <Route path='/*' element={<CalendarPage />} />
        }

        
        <Route path='/*' element={<Navigate to='/auth/login' />} />
    </Routes>
  )
}
