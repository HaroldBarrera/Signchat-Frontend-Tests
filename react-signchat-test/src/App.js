import { useState } from 'react';
import './App.css';
import ImageComponent from './components/ImageComponent';
import KeyboardComponent from './components/KeyboardComponent';

function App() {

  const [inputValue, setInputValue] = useState("");

  const handleButtonClick = async (key) => {
    let letter = await key.target.alt;
    setInputValue(inputValue + letter);
    console.log(letter);
  };

  return (
    <>
      <h1>Prueba de Signchat Microservicio</h1>
      <ImageComponent />
      <input type='text' value={inputValue} readOnly />
      <KeyboardComponent handleKeyClick={handleButtonClick} />
    </>
  );
}

export default App;