import React, { Component } from 'react';
import Auth from '../modules/Auth';
import { Redirect } from 'react-router-dom';

import Dashboard from './Dashboard';
import Kiosk from './Kiosk';
import KioskForm from './KioskForm';

class Controller extends Component {
	constructor(props) {
		super(props);
		this.state = {
			currentPage: props.currentPage,
			currentId: props.currentId || null,
			myKiosks: null,
			oneKiosk: null,
			dataLoaded: false,
			fireRedirect: false,
			redirectPath: null,
		}
		
		this.newKiosk = this.newKiosk.bind(this);
		this.kioskDelete = this.kioskDelete.bind(this);
		
	}
	
	componentDidMount() {
		if (this.state.currentPage === 'profile') {
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
					dataLoaded: true,
					})
					}).catch(err => console.log(err));
		} else if (this.state.currentPage === 'kiosk' || this.state.currentPage === 'edit') {
					fetch(`/kiosks/${this.state.currentId}`, {
						method: 'GET',
						headers: {
						token: Auth.getToken(),
						'Authorization': `Token ${Auth.getToken()}`,
						}
					}).then(res => res.json())
						.then(res => {
						this.setState({
						oneKiosk: res,
						dataLoaded: true,
						})
						}).catch(err => console.log(err));
		} else if (this.state.currentPage === 'new') {
			this.setState({
				dataLoaded: true,
			})
		}
	}
	
	newKiosk(method, e, data, id) {
		e.preventDefault();
		fetch(`/kiosks/${id || ''}`, {
			method: method,
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
				this.setState({
					fireRedirect: true,
					redirectPath: `/kisoks/${res.data.kiosk.id}`,
				})
			}).catch(err => console.log(err));
	}
	
	kioskDelete(id) {
		fetch(`/kiosks/${id}`, {
			method: 'DELETE',
			headers: {
				token: Auth.getToken(),
				'Authorization': `Token ${Auth.getToken()}`,
			}
		}).then(res => res.json())
			.then(res => {
				console.log(res);
				this.setState({
					fireRedirecy: true,
					redirectPath: '/profile',
				});
			}).catch(err => console.log(err));
	}
	
	decideWhichToRender() {
		switch (this.state.currentPage) {
			case 'profile':
				return <Dashboard myKiosks={this.state.myKiosks} />;
				break;
			case 'kiosk':
				return <Kiosk oneKiosk={this.state.oneKiosk} kioskDelete={this.kioskDelete} />;
				break;
			case 'new':
				return <KioskForm isAdd={true} newKiosk={this.newKiosk} />;
				break;
			case 'edit':
				return <KioskForm isAdd={false} newKiosk={this.newKiosk} oneKiosk={this.state.oneKiosk} />;
				break;
			default:
				return<Redirect push to='/profile' />;
				break;
		}
	}
	
	render() {
		return (
			<div className="container">
				{(this.state.dataLoaded) ? this.decideWhichToRender() : <p>Loading...</p>}
				{this.state.fireRedirect && <Redirect push to={this.state.redirectPath} />}
			</div>
		)
	}
}

export default Controller;