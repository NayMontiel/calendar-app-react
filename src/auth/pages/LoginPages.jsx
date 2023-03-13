import React, { useEffect } from 'react';
import { useAuthStore, useForm } from '../../hooks';
import './login.css';
import Swal from 'sweetalert2';

const loginFormFields = {
    loginEmail: '',
    loginPassword: ''
}

const registerFormFields = {
    registerName: '',
    registerEmail: '',
    registerPassword: '',
    registerPassword2: ''
}

export const LoginPages = () => {

    const { starLogin, errorMessage, starRegister } = useAuthStore();

    const {loginEmail, loginPassword, onInputChange:onLoginInputChange } = useForm(loginFormFields);

    const {registerName, registerEmail, registerPassword, registerPassword2, onInputChange} = useForm(registerFormFields);

    const loginSubmit = (event) => {
        event.preventDefault();
        starLogin({ email: loginEmail, password: loginPassword })
    } 

    const registerSubmit = (event) => {
        event.preventDefault();
        if (registerPassword !== registerPassword2) {
            Swal.fire({
                title: 'Error en registro!',
                text: 'Contraseñas no Coinciden',
                icon: 'error',
                confirmButtonText: 'OK'
              })
            return;
        }
        starRegister({ name: registerName, email: registerEmail, password: registerPassword })
    }

    useEffect(() => {
      if (errorMessage !== undefined) {
        Swal.fire({
            title: 'Error en la autenticación!',
            text: errorMessage,
            icon: 'error',
            confirmButtonText: 'OK'
          })
      }   
      
    }, [errorMessage])
    


    return (
        <div className="container login-container">
            <div className="row">
                <div className="col-md-6 login-form-1">
                    <h3>Ingreso</h3>
                    <form onSubmit={loginSubmit}>
                        <div className="form-group mb-2">
                            <input 
                                type="text"
                                className="form-control"
                                placeholder="Correo"
                                name="loginEmail"
                                value={loginEmail}
                                onChange={onLoginInputChange}
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                name="loginPassword"
                                value={loginPassword}
                                onChange={onLoginInputChange}
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input 
                                type="submit"
                                className="btnSubmit mt-3 fw-bold"
                                value="Login" 
                            />
                        </div>
                    </form>
                </div>

                <div className="col-md-6 login-form-2">
                    <h3>Registro</h3>
                    <form onSubmit={registerSubmit}>
                        <div className="form-group mb-2">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nombre"
                                name="registerName"
                                value={registerName}
                                onChange={onInputChange}
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Correo"
                                name="registerEmail"
                                value={registerEmail}
                                onChange={onInputChange}
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña" 
                                name="registerPassword"
                                value={registerPassword}
                                onChange={onInputChange}
                            />
                        </div>

                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Repita la contraseña" 
                                name="registerPassword2"
                                value={registerPassword2}
                                onChange={onInputChange}
                            />
                        </div>

                        <div className="form-group mb-2">
                            <input 
                                type="submit" 
                                className="btnSubmit mt-3 fw-bold" 
                                value="Crear cuenta" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
