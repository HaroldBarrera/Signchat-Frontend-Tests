import { useState } from "react";
import API_URLS from "./ApiConfig";

const ImageComponent = () => {
    const [imagen, setImagen] = useState(null);

    const getImage = async () => {
        const imageName = "sc_e.png";
        const response = await fetch(API_URLS.backend_url + `images/${imageName}`);

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