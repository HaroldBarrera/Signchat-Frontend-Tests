import { useState } from 'react';
import './App.css';
import ImageComponent from './components/ImageComponent';
import KeyboardComponent from './components/KeyboardComponent';

function App() {

  const [inputValue, setInputValue] = useState("");
  const [inputImgValue, setInputImgValue] = useState([]);

  const handleButtonClick = async (key) => {
    //let letter = await key.target.alt;
    //setInputValue(inputValue + letter);
    let imageUrl = key.target.src;
    setInputImgValue([...inputImgValue, imageUrl]);
  };

  const sendImagesToBackend = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/messages/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ images: inputImgValue }),
      });
  
      if (response.ok) {
        console.log(response);
        const translatedData = await response.text();
        setInputValue(translatedData);
        console.log('Imágenes enviadas con éxito al backend.');
      } else {
        console.error('Error al enviar imágenes al backend.');
      }
    } catch (error) {
      console.error('Error al enviar imágenes al backend:', error);
    }
  }

  return (
    <>
      <h1>Prueba de Signchat Microservicio</h1>
      <ImageComponent />
      {inputImgValue.map((url, index) => (
        <img key={index} src={url} alt={`Imagen ${index}`} />
      ))}
      <br />
      <button onClick={sendImagesToBackend}>Traducir</button>
      <br />
      <input type='text' value={inputValue} readOnly />
      <KeyboardComponent handleKeyClick={handleButtonClick} />
    </>
  );
}

export default App;