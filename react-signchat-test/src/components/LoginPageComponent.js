import { useState } from "react";
import { Link } from 'react-router-dom';
import API_URLS from "./ApiConfig";

const LoginPageComponent = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const logUser = async () => {
        console.log(username , " " , password);
        console.log(URL + 'api/users/login');
        const formData = new FormData();
        formData.append('nickname', username);
        formData.append('password', password);

        try {
            const response = await fetch(API_URLS.backend_url + 'api/users/login', {
              method: 'POST',
              body: formData,
            });
        
            if (response.ok) {
              console.log("Login succesfully gonorreaaaaaaaaaaaa");
            } else {
              console.error("Error al logear usuario");
            }
          } catch (error) {
            console.error('Error al logear usuario:', error);
          }
    }

    return(
        <>
            <main className="container">
                <h1 className="titlePage ">INICIAR SESION</h1>
                <hr />
                <div className="form">
                    <div className="form-group">
                        <label for="logusername">Nombre de usuario:</label>
                        <input type="text" value={username} onChange={(e) => (setUsername(e.target.value))} className="form-control" id="logusername" placeholder="Digite su nombre de usuario" />
                    </div>
                    <div className="form-group">
                        <label for="logpassword">Clave:</label>
                        <input type="password" value={password} onChange={(e) => (setPassword(e.target.value))} className="form-control" id="logpassword" placeholder="Clave" />
                        <small id="passHelp" className="form-text text-muted">Recuerda no compartir esta clave con nadie.</small>
                    </div>
                    <div className="container-center">
                        <button onClick={() => { logUser() }} className="btn-primary">Iniciar sesion</button>
                    </div>
                    <div className="container-center">
                        <h6>¿No tienes una cuenta?</h6><Link to='/register' className="routelink">REGISTRATE AQUI</Link>
                    </div>
                </div>
            </main>
        </>
    );
}

export default LoginPageComponent;