import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import {Routes, Route} from 'react-router-dom'

import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import createSagaMiddleware from '@redux-saga/core';
import { configureStore } from '@reduxjs/toolkit';
import catReducers from './catSlice';
import catSaga from './saga/catSaga';
import 'react-loading-skeleton/dist/skeleton.css'
import Cats from './pages/Cats';



const root = ReactDOM.createRoot(document.getElementById('root'));
const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    cats: catReducers
  },
  devTools: true,
  middleware: [sagaMiddleware]
})

sagaMiddleware.run(catSaga)

root.render(
  <Provider store={store}>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<App />}/>
      <Route path='/cats/:page' element={<Cats />}/>

    </Routes>
    </BrowserRouter>
  </Provider>
);


