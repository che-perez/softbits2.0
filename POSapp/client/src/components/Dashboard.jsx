import React, { Component } from 'react';
import Auth from '../modules/Auth';

import NewKioskForm from './NewKioskForm';

class Dashboard extends Component {
	constructor() {
		super();
		this.state = {
			myKiosks: {},
			kioskLoaded: false,
		}
	}
	
	componentDidMount() {
		this.getKiosks();
	}
	
	getKiosks() {
		fetch('/profile', {
			method: 'GET',
			headers: {
				token: Auth.getToken(),
				'Authorization': `Token ${Auth.getToken()}`,
			}
		}).then(res => res.json())
			.then(res => {
				this.setState({
					myKiosks: res.kiosk,
					kioskLoaded: true,
				})
			}).catch(err => console.log(err));
	}
	
	newKiosk(e, data) {
		fetch('/kiosks', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				token: Auth.getToken(),
				'Authorization': `Token ${Auth.getToken()}`,
			},
			body: JSON.stringify({
				kiosk: data,
			}),
		}).then(res => res.json())
			.then(res => {
				console.log(res);
				this.getKiosks();
			}).cath(err => console(err));
	}
	
	
	render() {
		return (
			<div className="profile">
				<NewKioskForm newKiosk={this.newKiosk} />
				{(this.state.kioskLoaded) ? 
					this.state.myKiosks.map(kiosk => {
						return <div className="kiosk" key={kiosk.id}>
								<h1>{kiosk.kiosk_name}</h1>
								<h2>{kiosk.address}</h2>
								<h3>{kiosk.location}</h3>
							   </div>
					}) : <p>Loading...</p>
					
					}
			</div>
		)
	}
}

export default Dashboard;