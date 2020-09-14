import React, {Component} from 'react'
import Card from './card'


class ControlPanel extends Component{

	render(){
		return(
			<div className="container-fluid d-flex justify-content-center">
				<div className="row">
					<div className="col-md-4">
						<Card />
					</div>
					<div className="col-md-4">
						<Card />
					</div>
					<div className="col-md-4">
						<Card />
					</div>
				</div>

			</div>



			)
	}


}

export default ControlPanel;