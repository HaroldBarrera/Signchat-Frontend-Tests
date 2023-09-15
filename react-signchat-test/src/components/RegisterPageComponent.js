import { useState } from "react";
import { Link } from 'react-router-dom';
import API_URLS from "./ApiConfig";

const RegisterPageComponent = () => {

    const [mensaje, setMensaje] = useState('');
    const [userCompletename, setUserCompletename] = useState('');
    const [userNickname, setUserNickname] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [userIsDeaf, setUserIsDeaf] = useState(false);

    const regUser = async() => {
        
        const formData = new FormData();
        formData.append('userCompleteName', userCompletename);
        formData.append('userNickname', userNickname);
        formData.append('userPassword', userPassword);
        formData.append('userIsDeaf', userIsDeaf);

        try {
            const response = await fetch(API_URLS.backend_url + 'api/users/create', {
              method: 'POST',
              body: formData,
            });
        
            if (response.ok) {
                setMensaje('Usuario creado con éxito');
              console.log(mensaje);
            } else {
                setMensaje('Error al crear usuario');
              console.error(mensaje);
            }
          } catch (error) {
            console.error('Error al crear usuario:', error);
          }
    }

    return (
        <>
            <main className="container">
                <h1 className="titlePage">REGISTRARSE</h1>
                <hr />
                <div className="form">
                    <div class="form-group">
                        <label for="nombre">Nombre completo:</label>
                        <input type="text" value={userCompletename} onChange={(e) => (setUserCompletename(e.target.value))} class="form-control" id="nombre" placeholder="Digite su nombre completo" />
                    </div>
                    <div class="form-group">
                        <label for="apellido">Nombre de usuario:</label>
                        <input type="text" value={userNickname} onChange={(e) => (setUserNickname(e.target.value))} class="form-control" id="apellido" placeholder="Digite un nombre de usuario" />
                        <small id="userHelp" class="form-text text-muted">Por este nombre es que por le que sera reconocido dentro de la aplicacion.</small>
                    </div>
                    <div class="form-group">
                        <label for="password">Clave:</label>
                        <input type="password" value={userPassword} onChange={(e) => (setUserPassword(e.target.value))} class="form-control" id="password" placeholder="Clave" />
                        <small id="passHelp" class="form-text text-muted">Recuerda no compartir esta clave con nadie.</small>
                    </div>
                    <label>
                        ¿El usuario es sordo?
                        <input
                        type="checkbox"
                        checked={userIsDeaf}
                        onChange={(e) => setUserIsDeaf(e.target.checked)}
                        />
                    </label>
                    <div className="container-center">
                        <button onClick={() => regUser()} type="submit" class="btn btn-primary">Registrarme</button>
                    </div>
                    <div className="container-center">
                        <h6>¿Ya tienes una cuenta?</h6><Link to='/login' className="routelink">INICIA SESION</Link>
                    </div>
                </div>
            </main>
            <div>
                <h2>{mensaje}</h2>
            </div>
        </>
    );
}

export default RegisterPageComponent;