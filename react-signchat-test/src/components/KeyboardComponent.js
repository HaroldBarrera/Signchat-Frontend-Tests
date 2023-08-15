import { useEffect, useState } from "react";

const KeyboardComponent = ({ handleKeyClick }) => {

    const [keyboardHtml, setKeyboardHtml] = useState('');

    useEffect(() => {
        fetch('http://localhost:8080/keyboard/react')
            .then(response => {
                if (response.ok) {
                    return response.text();
                } else {
                    throw new Error('Error al obtener el teclado');
                }
            })
            .then(data => {
                setKeyboardHtml(data);
            })
            .catch(error => {
                console.error(error);
            });
            
    }, []);

    return (
        <>
            <div dangerouslySetInnerHTML={{ __html: keyboardHtml }} onClick={handleKeyClick}/>
        </>
    );
}

export default KeyboardComponent;