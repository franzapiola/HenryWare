import React, {Component} from 'react'
import Card from './card'

const imgAdd= "http://images.all-free-download.com/images/graphicthumb/document_add_100293.jpg";
const imgOrders = "https://http2.mlstatic.com/100-hojas-papel-bond-blanco-alta-blancura-medida-33-x-483-D_NQ_NP_922905-MLM25110687502_102016-F.jpg";
const imgUsers = "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.knack.com%2F_images%2Flive%2Fusers.png&f=1&nofb=1";


class ControlPanel extends Component{

	
	render(){
		return(
			<div className="container-fluid d-flex mt-4 justify-content-center">
				<div className="row">
					<div className="col-md-4">
						<Card 
						imgsrc={imgAdd}
						title="Agregar Categorias/Productos"
						text="Modificar las categorias o los productos" 
						linkto="/products/edit"
						/>
					</div>
					<div className="col-md-4">
						<Card imgsrc={imgOrders}
						title="Ordenes"
						text="Ordenes de los usuarios"
						linkto = "/orders/table"
						/>
					</div>
					<div className="col-md-4">
						<Card imgsrc={imgUsers}
						title="Usuarios"
						text="Usuarios registrados con sus roles"
						/>
					</div>
				</div>

			</div>



			)
	}


}

export default ControlPanel;