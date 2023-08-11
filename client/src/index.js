import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './App';
import { createStore } from 'redux';
import { setBaseInfo, setForecastCity } from './setObjects';
import { reducer } from './reducer';
import rootReducer from './rootReducer';

const store = createStore(rootReducer);
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
