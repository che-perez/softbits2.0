import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Auth from '../modules/Auth';


class Dashboard extends Component {
	constructor(props) {
		super(props);
	}
	
	
	
	render() {
		console.log(this.props)
		return (
			<div className="profile">
			<Link  className="form-links" to='/new'>Add New Kiosk</Link>
				{this.props.myKiosks.map(kiosk => {
					return (
						<div className="kiosks" key={kiosk.id}>
							<h2>{kiosk.kiosk_name}</h2>
							<h3>{kiosk.address}</h3>
							<h4>{kiosk.location}</h4>
							<Link className="links" to={`kiosks/${kiosk.id}`}>Details</Link>
							<Link className="form-links" to={`kiosks/${kiosk.id}/edit`}>Edit Kiosk
								</Link>
							<span className="delete" onClick={() =>
								this.props.kioskDelete(
									kiosk.id)}>Delete</span>
						</div>
					)
				})}
			</div>
		)
	}
}

export default Dashboard;