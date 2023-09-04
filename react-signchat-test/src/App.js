import { useState } from 'react';
import './App.css';
import ImageComponent from './components/ImageComponent';
import KeyboardComponent from './components/KeyboardComponent';

function App() {

  const [inputValue, setInputValue] = useState("");
  const [inputImgValue, setInputImgValue] = useState([]);
  const spaceView = "space_view.png";

  const handleButtonClick = async (key) => {
    let imageUrl = key.target.src;
    if(imageUrl != null){
      if(key.target.alt === " "){
        setInputImgValue((prevValue) => [...prevValue, " "]);
      }else if(key.target.alt === "del"){
        setInputImgValue((prevValue) => prevValue.slice(0, -1));
      }else {
        setInputImgValue([...inputImgValue, imageUrl]);
        console.log(inputImgValue);
      }
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
        <img key={index} src={url} alt={`http://localhost:8080/images/${spaceView}`} /> //TODO: Ver el caracter de space
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