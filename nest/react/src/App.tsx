import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { store } from './app/store';
import DeleteProduct from './components/DeleteProduct';
import { Provider } from 'react-redux';

function App() {
  const [count, setCount] = useState(0);
  return (
    <>
      <Provider store={store}>
      <DeleteProduct/>

      </Provider>
    </>
  )
}
export default App

