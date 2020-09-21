import React, { useState } from 'react'
import styles from './register.module.scss'
import { FormControl, TextField, Button } from '@material-ui/core';
import GoogleButton from 'react-google-button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

 function Register (props) {
    //Redux
    const { user } = props;
    const history = useHistory();
    //form carga los datos del formulario
    const [form, setForm] = useState({})
    //errors carga los errores que devuelve la api
    const [errors, setErrors] = useState({})
    //update field va a gregando al form los datos cargados en el formulario 
    const updateField = async e => {
        const { id, value } = e.target
        await setForm({ 
            ...form,
            [id]: value
        })
    }
    //handlesubmit envia al servidor la data para ingresar el nuevo usuario
    const handleSubmit = (e) => {
        e.preventDefault();
        //envio datos al servidor
        const result = fetch(`http://localhost:3001/users`, {
            method: 'POST',
            body: JSON.stringify(form), // data can be `string` or {object}!
            headers: {
                'Content-Type': 'application/json'
            }
        })
        result.then(res => res.json())
            .then(res => {
                if (res.status === 201) {
                    //si la respuesta es 201 crea el usuario y vacia los states
                    setForm({})
                    setErrors({})
                    return notify()
                }
                if (res.status === 400) {
                    //si hay algun error lo manejo. puede ser un array como un objeto por eso el if else
                    let texto;
                    const resErrors = res.message.errors
                    if (Array.isArray(resErrors)) {
                        texto = 'No se ha podido crear el usuario'
                        resErrors.map(async err =>
                            await setErrors({ [err.path]: err.message })
                        );
                    } else {
                        texto = res.message.original.detail

                    }
                    notify(texto, 'error')
                }

            })

    }
    

    const notify = (message = 'Usuario creado con exito', type = 'success') => toast[type](message, { position: toast.POSITION.TOP_CENTER });

    	//Si ya hay un usuario loggeado, redirigirlo automáticamente al home
	if(user.role != 'Guest'){
		history.push('/');
    }
    
    return (
        <div className={`pt-3 mt-5 d-flex align-items-center w-75 mx-auto ${styles.container2} position-relative`}>
            <h1 className={`${styles.titulo}`}>Abrir una Cuenta</h1>

            <div className="d-flex align-items-center  h-75 col-md-6 border-right">
                
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-md-4 offset-2 mb-4">
                            <FormControl className='col-md-12'>
                                <TextField
                                    error={errors.first_name ? 'error' : null}
                                    
                                    helperText={errors.first_name ? errors.first_name : null}
                                    value={form.first_name ? form.first_name : ''}
                                    id="first_name"
                                    label="Nombre"
                                    onChange={updateField} />
                            </FormControl>
                        </div>
                        <div className="col-md-4 mb-4">
                            <FormControl className='col-md-12'>
                                <TextField
                                    error={errors.last_name ? 'error' : null}
                                    helperText={errors.last_name ? errors.last_name : null}
                                    value={form.last_name ? form.last_name : ''}
                                    id="last_name"
                                    label="Apellido"
                                    onChange={updateField} />
                            </FormControl>
                        </div>
                        <div className="col-md-8 offset-2 mb-4">
                            <FormControl className='col-md-12'>
                                <TextField
                                    error={errors.email ? 'error' : null}
                                    helperText={errors.email ? errors.email : null}
                                    value={form.email ? form.email : ''}
                                    id="email" label="Email"
                                    onChange={updateField} />
                            </FormControl>
                        </div>
                        <div className="col-md-4 offset-2">
                            <FormControl className='col-md-12'>
                                <TextField
                                    error={errors.address ? 'error' : null}
                                    helperText={errors.address ? errors.address : null}
                                    value={form.address ? form.address : ''}
                                    id="address"
                                    label="Direccion"
                                    onChange={updateField} />
                            </FormControl>
                        </div>
                        <div className="col-md-4 mb-4 mb-4">
                            <FormControl className='col-md-12'>
                                <TextField
                                    error={errors.phone_number ? 'error' : null}
                                    helperText={errors.phone_number ? errors.phone_number : null}
                                    value={form.phone_number ?
                                        form.phone_number : ''}
                                    id="phone_number"
                                    label="Teléfono"
                                    onChange={updateField} />
                            </FormControl>
                        </div>
                        <div className="col-md-8 offset-2 mb-4">
                            <FormControl className='col-md-12'>
                                <TextField
                                    type='password'
                                    id="password"
                                    label="Contraseña"
                                    onChange={updateField} />
                            </FormControl>
                        </div>
                        <div className="col-md-8 offset-2 mb-4">
                            <FormControl className='col-md-12'>
                                <TextField
                                    type='password'
                                    id="confirmPassword"
                                    label="Confirme su contraseña"
                                    onChange={} />
                            </FormControl>
                        </div>
                        <div className="col-md-4 offset-4 mb-4">
                            <Button
                                type='submit'
                                variant="contained"
                                className={`${styles.henryColor} col-md-12`}>
                                Registrarme
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
            <div className="d-flex flex-column align-items-center justify-content-center login-redes h-75 col-md-6">
                <div className='mb-2'><GoogleButton label='Continuar con Google' onClick={() => { console.log('Google button clicked') }} /></div>
            </div>
            <ToastContainer />
        </div>
    )
}

const mapStateToProps = state => {
    return {
        user: state.auth
    }
}

export default connect(mapStateToProps)(Register);