import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import DeleteProduct from './components/DeleteProduct';
import { ComponentForm } from './components/ComponentForm';
import AddProductForm from './components/AddProductForm';

function App() {
  const [count, setCount] = useState(0);
  return (
    <>
      {/* <DeleteProduct/> */}
      <ComponentForm />
      {/* <AddProductForm/> */}
    </>
  )
}
export default App

