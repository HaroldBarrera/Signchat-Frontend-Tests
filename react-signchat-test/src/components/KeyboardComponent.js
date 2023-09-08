import { useEffect, useState } from "react";

const KeyboardComponent = ({ handleKeyClick }) => {

    const [keyboardHtml, setKeyboardHtml] = useState('');
    const URL = process.env.REACT_APP_BACKEND_GURL;

    useEffect(() => {
        fetch(URL + 'keyboard/react')
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