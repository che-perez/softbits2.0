import React, { Component } from 'react';
import Auth from '../modules/Auth';
import { BrowserRouter as Router, Link, Route} from 'react-router-dom';

import Controller from './Controller';


class Kiosk extends Component {
	constructor(props) {
		super(props);
		
	}
	
	render() {
		console.log(this.props)
		return (
			<Router>
			<div className="container">
				<div className="info-kiosk">
					<h1>{this.props.oneKiosk.kiosk.kiosk_name}</h1>
					<h3>{this.props.oneKiosk.kiosk.address}</h3>
					<span className="links" onClick={(e) => this.props.newOrder(e)}>Create Order</span>
				</div>
				<div className="inventory">
					<h1>Inventory</h1>
					<Link className="form-links" to={`/${this.props.oneKiosk.kiosk.id}/item-new`}>New Item</Link>
					<Route exact path="/:id/item-new" render={props => (<Controller
						currentPage="new-item" currentId={this.props.oneKiosk.kiosk.id} /> )} />
					{this.props.oneKiosk.kiosk_inventory.map(item => {
						return (
							<div className="item box box1 shadow1" key={item.id}>
								<h2>{item.item_name}</h2>
								<h4>{item.item_type}</h4>
								<p>Quantity: {item.item_quantity}</p>
								<p>Price: ${item.item_cost}</p>
								<Link className="form-links" to={`/${this.props.oneKiosk.kiosk.id}/item-edit`}>Edit Item</Link>
								<span className="delete" onClick={() => this.props.itemDelete(item.id)}>Delete</span>
								<Route exact path="/:id/item-edit" render={props => (<Controller
                currentPage="item-edit" currentId={this.props.oneKiosk.kiosk.id} itemId={item.id} /> )} />
							</div>
					)
					})}
				</div>
				

			</div>
			</Router>
		)
	}
}

export default Kiosk;