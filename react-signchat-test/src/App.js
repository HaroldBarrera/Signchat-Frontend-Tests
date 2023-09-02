import { useState } from 'react';
import './App.css';
import ImageComponent from './components/ImageComponent';
import KeyboardComponent from './components/KeyboardComponent';

function App() {

  const [inputValue, setInputValue] = useState("");
  const [inputImgValue, setInputImgValue] = useState([]);

  const handleButtonClick = async (key) => {
    let imageUrl = key.target.src;
    if(imageUrl != null){
      setInputImgValue([...inputImgValue, imageUrl]);
    }
  };

  const sendImagesToBackend = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/messages/translate/img-txt', {
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

  const sendTextToBackend = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/messages/translate/txt-img', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: inputValue }),
      });
  
      if (response.ok) {
        console.log(response);
        const translatedData = await response.json();
        setInputImgValue(translatedData);
        console.log('Mensaje enviado con éxito al backend.');
      } else {
        console.error('Error al enviar el mensaje al backend.');
      }
    } catch (error) {
      console.error('Error al enviar el mensaje al backend:', error);
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
      <button onClick={sendImagesToBackend}>Traducir imagenes</button>
      <button onClick={sendTextToBackend}>Traducir texto</button>
      <br />
      <input type='text' value={inputValue} onChange={(e) => {setInputValue(e.target.value)}}/>
      <KeyboardComponent handleKeyClick={handleButtonClick} />
    </>
  );
}

export default App;