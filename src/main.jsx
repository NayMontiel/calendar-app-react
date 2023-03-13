import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux';

import { Calendario } from './Calendario'
import { store } from './store/store';

import "bootstrap/dist/css/bootstrap.min.css";
import './index.css'



ReactDOM.createRoot(document.getElementById('root')).render(
 <React.StrictMode>
  <Provider store={store}>
    <BrowserRouter>
      <Calendario />
    </BrowserRouter>
    </Provider>
 </React.StrictMode>,
)
