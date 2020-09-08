import React, {useState} from 'react';
import { Form, Container, Button, Alert } from 'react-bootstrap';

const AddCategory = () => {
    //Estado que almacena el valor del input del form, se actualiza automáticamente al escribir en el input
    const [form, setForm] = useState({name:''});
    //handler del submit, hace un POST, en el body está el estado form
    const [sent, setSent] = useState(false);
    const handleSubmit = (data, e) => {
        e.preventDefault();
        fetch('http://localhost:3001/products/category', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(()=>{
            setSent(true);
            setForm({name:''})
        })
        .catch(err=>console.log(err));
    }

    return (
        <Container >
            <h2>Agregar nueva categoría de productos</h2>
            <br />
            <Form onSubmit = {(e)=>{handleSubmit(form, e);}}>
                <Form.Group controlId="categoryName">
                <Form.Label>Ingresá el nombre deseado:</Form.Label>
                    <Form.Control type="text" value={form.name} placeholder="Nueva categoría..." onChange={(e)=>{setForm({name: e.target.value})}}/>
                    <Form.Text className="text-muted">
                        Un ID único le será asignado automáticamente a la nueva categoría en la base de datos.
                    </Form.Text>
                    <Button type='submit' >Enviar</Button>
                </Form.Group>
            </Form>
        </Container>
    );
}

export default AddCategory;