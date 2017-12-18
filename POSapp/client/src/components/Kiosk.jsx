import React, { Component } from 'react';
import Auth from '../modules/Auth';

class Kiosk extends Component {
	constructor(props) {
		super(props);
		
	}
	
	render() {
		console.log(this.props)
		return (
			<div className="container">
				<div className="info-kiosk">
					<h1>{this.props.oneKiosk.kiosk.kiosk_name}</h1>
					<h3>{this.props.oneKiosk.kiosk.address}</h3>
				</div>
				<div className="inventory">
					<h1>Inventory</h1>
					{this.props.oneKiosk.kiosk_inventory.map(item => {
						return (
							<div className="item" key={item.id}>
								<h2>{item.item_name}</h2>
								<h4>{item.item_type}</h4>
								<p>Quantity:{item.item_quantity}</p>
								<p>Price: ${item.item_cost}</p>
							</div>
					)
					})}
				</div>
			</div>
		)
	}
}

export default Kiosk;