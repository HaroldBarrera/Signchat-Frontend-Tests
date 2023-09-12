import { useEffect, useState } from 'react';
import ImageComponent from './ImageComponent';
import KeyboardComponent from './KeyboardComponent';
import SockJsClient from 'react-stomp';

//Websocket
const SOCKET_URL = process.env.REACT_APP_SOCKET_GURL; //Cambiar url dependiendo del backend

//Backend
const URL = process.env.REACT_APP_BACKEND_GURL;

const ChatPageComponent = () => {

  const [inputValue, setInputValue] = useState("");
  const [inputImgValue, setInputImgValue] = useState([]);
  const [messages, setMessages] = useState([]);
  //const spaceView = "space_view.png";

  //Websocket
  let onConnected = () => {
    console.log('Connected!');
  }

  let onMessageReceived = (msg) => {
    console.log(msg);
    setMessages(...messages, msg.messageText);
  }

  let onDisconnected = () => {
    console.log('Disconnected!');
  }

  // Función para enviar un mensaje
  const sendMessage = async () => {
    if (inputValue.trim() !== '') {
      // Enviar el mensaje al servidor WebSocket
      // Aquí deberías usar SockJsClient para enviar el mensaje al servidor WebSocket
      // Por ejemplo:
      // clientRef.sendMessage('/app/sendMessage', JSON.stringify({ messageText: inputValue }));
      
      // Agregar el mensaje al estado de la conversación
      setMessages([...messages, inputValue]);
      setInputValue(''); // Limpiar el campo de entrada
    }
  };

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
    console.log(URL + 'api/messages/translate/img-txt');
    try {
      const response = await fetch(URL + 'api/messages/translate/img-txt', {
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
      const response = await fetch(URL + 'api/messages/translate/txt-img', {
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

      <SockJsClient 
        url={SOCKET_URL}
        topics={['/topic/message']}
        onConnect={onConnected}
        onDisconnect={onDisconnected}
        onMessage={msg => onMessageReceived(msg)}
        debug={true}
      />
      <div className="message-container">
        {messages.map((message, index) => (
          <div key={index} className="message">{message}</div>
        ))}
      </div>

      <br />
      <br />

      <ImageComponent />

      {inputImgValue.map((url, index) => (
        <img key={index} src={url} alt={` `} /> //TODO: Ver el caracter de space
      ))}

      <br />
      <button onClick={sendImagesToBackend}>Traducir imagenes</button>
      <button onClick={sendTextToBackend}>Traducir texto</button>
      <button onClick={sendMessage}>Enviar</button>
      <br />

      <input type='text' value={inputValue} onChange={(e) => {setInputValue(e.target.value)}}/>
      <KeyboardComponent handleKeyClick={handleButtonClick} />
    </>
  );
}

export default ChatPageComponent;