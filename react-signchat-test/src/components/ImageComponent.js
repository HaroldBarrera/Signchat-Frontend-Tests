import { useState } from "react";

const ImageComponent = () => {
    const [imagen, setImagen] = useState(null);

    const getImage = async () => {
        const imageName = "sc_e.png";
        const response = await fetch(`http://localhost:8080/images/${imageName}`);

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