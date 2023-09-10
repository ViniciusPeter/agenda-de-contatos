import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { MyContextProvider } from './context/MyContext';
import MyRoutes from './router';
import './styles/buttom.css';
import './styles/form.css';
import './styles/index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <MyContextProvider>
        <MyRoutes />
      </MyContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
