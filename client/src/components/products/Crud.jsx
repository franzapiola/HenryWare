import React, { useState, useEffect } from 'react'
import { Button, Modal, Form } from 'react-bootstrap'
import bsCustomFileInput from 'bs-custom-file-input'
import Select from 'react-select'


export default function Crud(props) {
    //destructuro las props
    const { products, setProducts, getProducts, categories } = props

    //show muestra el modal si esta en TRUE
    const [ show, setShow ] = useState(false);

    //addEdit lo utilizamos para setear el método POST o PUT en el fetch que agrega o edita
    const [ addEdit, setAddEdit ] = useState()

    //state para editar un registro
    const [ idUpdate, setIdUpdate ] = useState()

    //show muestra el modal si esta en TRUE
    const [ showCat, setShowCat ] = useState(false);

    //state para id de categoria
    const [ idCategoria, setIdCategoria ] = useState()

    //state para id de producto
    const [ idProducto, setIdProducto ] = useState()
    
    //form es un objeto que toma todos los valores del formulario
    const [ form, setForm ] = useState({
        name: '',
        description: '',
        warranty: '',
        price:'',
        stock:'',
        image:'',
        rating:null,
    })

    //actualiza el state de form segun van cambiando los inputs
    const updateField = async e => {
        const {name, value} = e.target
       // console.log(name, value)
        await setForm({
            ...form,
            [name]: value
        })
    }

    //handleClose cierra la ventana modal
    const handleClose = () => setShow(false);

    //handleClose cierra la ventana modal categories
    const handleCloseCat = () => setShowCat(false);

    //handleAddUpdate muestra la ventana modal y además actualiza el state de addEdit para hacer el fetch
    const handleAddUpdate = (product, addEdit) =>{
        setAddEdit(addEdit)
        if(addEdit==='PUT'){           
            setIdUpdate(product.product_id)
            setForm({
                name: product.name,
                description: product.description,
                warranty: product.warranty,
                price: product.price,
                stock: product.stock,
                image: product.image,
                rating:null,
            })
        }else{
            setIdUpdate('')
            setForm({
                name: '',
                description: '',
                warranty: '',
                price:'',
                stock: '',
                image:'',
                rating:null,
            })
        }
        console.log(idUpdate)
        setShow(true);
    }

    //Delete del elemento por el Id
    const handleDelete = (id) => {
        const deletear = fetch(`http://localhost:3001/products/${id}`, {
            method: 'DELETE',
            headers:{
                'Content-type': 'application/json'
            }
        })
        deletear.then( res => {
            setProducts(products.filter( prod => prod.product_id !== id))
        })
    }

    //handleSubmit envia los datos para crear o actualizar un registro
    const handleSubmit = (e) =>{
        console.log(idUpdate)
        e.preventDefault()     
        const result = fetch(`http://localhost:3001/products/${idUpdate&&idUpdate}`, {
            method: addEdit, //POST or 'PUT'
            body: JSON.stringify(form), // data can be `string` or {object}!
            headers:{
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            //traigo de nuevo los productos de la db
            getProducts()
        })
        handleClose()
    } 
    const handleSubmitCat = (e) =>{
        e.preventDefault()
        console.log(`http://localhost:3001/products/${idProducto}/category/${idCategoria}`)
        fetch(`http://localhost:3001/products/${idProducto}/category/${idCategoria}`,{
            method:'POST',
            mode:'cors',
        })
    }
    const showModalCat = (idProducto)=>{
        setShowCat(true)
        setIdProducto(idProducto)
    }
    const categorias = (cate) => {
        const options = []
        for (const objeto of cate) {
            options.push(objeto)
        }
        const newOp=[]
        for (let i = 0; i < options.length; i++) {
            newOp.push({value:options[i].category_id,label:options[i].name})
        }
        //console.log(newOp)
        return newOp
    }
    const handleChangeCat = selectedOption => {
        setIdCategoria(selectedOption.value);
        //console.log(`Option selected:`, selectedOption.value);
    }
    const style = {
        img: {
            width: '100px',
        },
    }
    useEffect( () => {
        //Cambia el nombre del file-input
        bsCustomFileInput.init();
    })
    return (
        <div className='col-md-8 offset-2 pt-3 table-responsive'>
        {/* Componentes de react-bootstrap */}
        <Button variant='info' className='mb-3'  onClick={()=>handleAddUpdate('', 'POST')}>Agregar Producto</Button>
            <table className='table table-striped table-collapse'>
            <thead>
            <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Garantía</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Imágen</th>
            <th>categorias</th>
            <th></th>
            <th></th>
            <th></th>
            </tr>
            </thead>
            <tbody>
            {products.map(prod => 
                <tr key={prod.product_id}>
                <td>{prod.product_id}</td>
                <td>{prod.name}</td>
                <td>{prod.description.length>15?prod.description.slice(0, 15)+'...':prod.description}</td>
                <td>{prod.warranty}</td>
                <td>{prod.price}</td>
                <td>{prod.stock}</td>
                <td><img src={prod.image} style={style.img}/></td>
                <td></td>
                <td><Button variant='primary' onClick={()=>handleAddUpdate(prod, 'PUT')}>
                    <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-pencil-square" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                    <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                    </svg>    
                </Button></td>
                <td><Button variant='danger' onClick={ () => handleDelete(prod.product_id) } >
                <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-trash" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                </svg>    
                </Button></td>
                <td><button className="btn btn-primary " onClick={()=>showModalCat(prod.product_id)}>Añadir categoria</button></td>
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
                        <Form.Label>Ingrese el nombre del producto</Form.Label>
                        <Form.Control id='name' name='name' value={form.name} type="text" placeholder="Ingrese Producto" onChange={updateField} />
                        <Form.Label>Ingrese la descripción del producto</Form.Label>
                        <Form.Control id='description' name='description' value={form.description} type="text" placeholder="Ingrese Descripcion" onChange={updateField}/>                    
                        <Form.Label>Garantía (días)</Form.Label>
                        <Form.Control id='warranty' name='warranty' value={form.warranty} type="number" placeholder="Ingrese Tiempo de Garantía" onChange={updateField}/> 
                        <Form.Label>Ingrese el precio</Form.Label>
                        <Form.Control id='price' name='price' value={form.price} type="number" placeholder="Precio" onChange={updateField}/> 
                        <Form.Label>Ingrese el stock</Form.Label>
                        <Form.Control id='stock' name='stock' value={form.stock} type="text" placeholder="Ingrese Existencias" onChange={updateField}/> 
                        <Form.Label>Ingrese la imagen [URL]</Form.Label>
                        <Form.Control id='image' name='image' value={form.image} type="text" placeholder="Ingrese Url de Imagen" onChange={updateField}/>                  
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cerrar
                    </Button>
                    <Button variant="primary" type='submit'>
                        Guardar los cambios
                    </Button>                
                    </Modal.Footer>
                    </Form.Group>
                </Form>
            </Modal> 
            <Modal show={showCat} onHide={handleCloseCat}>
                <Form onSubmit={handleSubmitCat}>
                    <Form.Group>
                        <Modal.Header closeButton>
                            <Modal.Title> añadir categorias</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form.Label>categorias</Form.Label>
                            <Select options ={categorias(categories)} onChange={handleChangeCat}/>     
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleCloseCat}>
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
