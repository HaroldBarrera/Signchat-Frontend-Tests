import { useState } from "react";

const ImageComponent = () => {
    const [imagen, setImagen] = useState(null);
    const URL = 'https://haroldbarrera-automatic-parakeet-gpjj55r57vqc59v-8080.app.github.dev/';
    //const URL = 'https://localhost:8080/';

    const getImage = async () => {
        const imageName = "sc_e.png";
        const response = await fetch(URL + `images/${imageName}`);

        if(response.ok){
            const blob = await response.blob();
            setImagen(URL.createObjectURL(blob));
        } else {
            // TODO manejar solicitud no exitosa
        }
    }

    return(
        <div>
            <button onClick={getImage}>Cargar Imagen</button>
            {imagen && <img src={imagen} alt="Imagen de tecla LSC" />}
        </div>
    );
}

export default ImageComponent;