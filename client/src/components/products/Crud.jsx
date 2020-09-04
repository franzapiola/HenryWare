import React, { useState, useEffect } from 'react'
import { Button, Modal, Form } from 'react-bootstrap'

export default function Crud(props) {
    //show muestra el modal si esta en TRUE
    const [ show, setShow ] = useState(false);
    //addEdit lo utilizamos para setear el método POST o PUT en el fetch que agrega o edita
    const [ addEdit, setAddEdit ] = useState()
    //state para editar un registro
    const [ idUpdate, setIdUpdate ] = useState()
    //form es un objeto que toma todos los valores del formulario
    const [ form, setForm ] = useState({
        name: '',
        description: '',
        warranty: '',
        price:'',
        stock:'',
        image:'https://as.com/meristation/imagenes/2018/09/11/header_image/723533421536694195.png',
        rating:null,
    })
    //actualiza el state de form segun van cambiando los inputs
    const updateField = e => {
        const {name, value} = e.target
        setForm({
            ...form,
            [name]: value
        })
    }
    //handleClose cierra la ventana modal
    const handleClose = () => setShow(false);

    //handleAddUpdate muestra la ventana modal y además actualiza el state de addEdit para hacer el fetch
    const handleAddUpdate = (id, addEdit) =>{
        setAddEdit(addEdit)
        if(addEdit==='PUT'){           
            setIdUpdate(id)
        }else{
            setIdUpdate('')
        }
        console.log(idUpdate)
        setShow(true);
    }
    const handleDelete = (id) => {
        const deletear = fetch(`http://localhost:3001/products/${id}`, {
            method: 'DELETE',
            headers:{
                'Content-type': 'application/json'
            }
        })
        deletear.then( res =>console.log(res))
    }

    //handleSubmit envia los datos para crear o actualizar un registro
    const handleSubmit = (e) =>{
        e.preventDefault()
        console.log('idUpdate', idUpdate, 'addEdit', addEdit)        
        const result = fetch(`http://localhost:3001/products/${idUpdate&&idUpdate}`, {
            method: addEdit, //POST or 'PUT'
            body: JSON.stringify(form), // data can be `string` or {object}!
            headers:{
                'Content-Type': 'application/json'
            }
        })
        .then(res => console.log(res))
        handleClose()
    } 
    const { products } = props
    const style = {
        img: {
            width: '100px',
        }
    }
    useEffect(()=>{
        /* handleAddUpdate(); */
        if(addEdit==='PUT'){           
            Object.keys(form).map(key=>{
                if(key!=='image') 
                if(document.getElementsByName(key)[0]) console.log(document.getElementsByName(key)[0].value = 1)
            })
        }
    },[handleAddUpdate])
    return (
        <div className='col-md-10 offset-1 pt-3'>
        {/* Componentes de react-bootstrap */}
        <Button variant='info' className='mb-3'  onClick={()=>handleAddUpdate('', 'POST')}>Agregar Producto</Button>
            <table className='table table-striped'>
            <thead>
            <tr>
            <th>Nombre</th>
            <th>Descripcion</th>
            <th>Garantía</th>
            <th>Precio</th>
            <th>Descripción</th>
            <th>Imágenes</th>
            <th></th>
            <th></th>
            </tr>
            </thead>
            <tbody>
            {products.map(prod => 
                <tr key={prod.product_id}>
                <td>{prod.name}</td>
                <td>{prod.description}</td>
                <td>{prod.warranty}</td>
                <td>{prod.price}</td>
                <td>{prod.stock}</td>
                <td><img src={prod.image} style={style.img}/></td>
                <td><Button variant='primary' onClick={()=>handleAddUpdate(prod.product_id, 'PUT')}>Editar</Button></td>
                <td><Button variant='danger' onClick={ () => handleDelete(prod.product_id) } >Eliminar</Button></td>
                </tr>
            )}     
            </tbody>       
            </table>
            <Modal show={show} onHide={handleClose}>
                <Form onSubmit={handleSubmit}>
                    <Form.Group>
                    <Modal.Header closeButton>
                    <Modal.Title>{ addEdit==='POST'?'Agregar':'Editar'} Producto</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Label>Nombre de Producto</Form.Label>
                        <Form.Control id='name' name='name' type="text" placeholder="Ingrese Producto" onChange={updateField} />
                        <Form.Label>Descripcion</Form.Label>
                        <Form.Control id='description' name='description' type="text" placeholder="Ingrese Descripcion" onChange={updateField}/>                    
                        <Form.Label>Garantia (Días)</Form.Label>
                        <Form.Control name='warranty' type="number" placeholder="Ingrese Tiempo de Garantía" onChange={updateField}/> 
                        <Form.Label>Precio</Form.Label>
                        <Form.Control name='price' type="number" placeholder="Precio" onChange={updateField}/> 
                        <Form.Label>Stock</Form.Label>
                        <Form.Control name='stock' type="text" placeholder="Ingrese Existencias" onChange={updateField}/> 
                        <Form.Label>Imagen</Form.Label>
                        <Form.File 
                            id="custom-file"
                            name='image'
                            label="Custom file input"
                            custom
                        />                    
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cerrar
                    </Button>
                    <Button variant="primary" type='submit'>
                        Guardar Cambios
                    </Button>                
                    </Modal.Footer>
                    </Form.Group>
                </Form>
            </Modal>                          
        </div>
    )
}
