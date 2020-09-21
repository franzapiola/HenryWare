import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Button, Container } from 'react-bootstrap'
import axios from 'axios'
//Redux
import { loadUserData } from '../../redux/actions/auth'
import { connect } from 'react-redux';

const PasswordReset = props => {
    const history = useHistory();
    const { user, loadUserData } = props;
    
    const [form, setForm] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.put(`http://localhost:3001/users/${user.user_id}/password-reset`, {
            newPassword: form
        })
        .then(() => {
            //Se cierra sesión luego de cambiar la password
            loadUserData({ role: 'Guest'});
            localStorage.removeItem('actualToken');
        })
        .then(() => history.push('/'))
        .catch(err => console.log(err));
    }

    return (
        <Container>
            <h4>Hola, {user.first_name}!</h4>
            <h5>¿Deseas cambiar tu contraseña?</h5>
            <br></br>
            <Form onSubmit = {(e)=> handleSubmit(e)}>
                <Form.Group controlId="categoryName">
                    <Form.Label>Ingresá la nueva contraseña:</Form.Label>
                    <Form.Control type="password" value={form} placeholder='Nueva contraseña...' onChange={(e)=>{setForm(e.target.value)}}/>
                    <Form.Text className="text-muted">
                        Tendrás que volver a iniciar sesión luego de hacer el cambio.
                    </Form.Text>
                    <Button type='submit' >Enviar</Button>
                </Form.Group>
            </Form>
        </Container>
    )
}

const mapStateToProps = state => {
    return {
        user: state.auth
    }
}

const mapDispatchToProps = dispatch => {
    return {
        loadUserData: (data) => dispatch(loadUserData(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PasswordReset);