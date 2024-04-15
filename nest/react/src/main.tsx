
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux';
import { store } from './app/store';
import { arrComponentStore } from './components/app/store.ts';
import App from './App.tsx'
import './index.css'

const combineStore = {
  ...store,
  arrComponentStore
}
ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={combineStore}>
    <React.StrictMode>
      <App />

    </React.StrictMode>
  </Provider>

);

