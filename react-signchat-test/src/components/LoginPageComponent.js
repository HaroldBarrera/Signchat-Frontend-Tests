import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';

//Backend
const URL = process.env.REACT_APP_BACKEND_URL;

const LoginPageComponent = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const logUser = async () => {
        const formData = new FormData();
        formData.append('username', username);
        formData.append('password', password);

        try {
            const response = await fetch(URL + 'api/users/login', {
                method: 'POST',
                body: formData,
                credentials: 'include', // Enviar cookies con la solicitud
                headers: {
                    'Accept': 'application/json',
                },
            });

            if (response.ok) {
                // Redirigir después del inicio de sesión exitoso
                navigate('/');
            } else {
                console.error("Error al iniciar sesión");
            }
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
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