import React, { Component } from 'react';
import Auth from '../modules/Auth';
import { Redirect } from 'react-router-dom';

import Dashboard from './Dashboard';
import Kiosk from './Kiosk';
import KioskForm from './KioskForm';
import ItemForm from './ItemForm';
import Order from './Order';

class Controller extends Component {
	constructor(props) {
		super(props);
		this.state = {
			currentPage: props.currentPage,
			currentId: props.currentId || null,
			itemId: props.itemId || null,
			myKiosks: null,
			oneKiosk: null,
			oneItem: null,
			dataLoaded: false,
			fireRedirect: false,
			redirectPath: null,
		}
		
		this.newKiosk = this.newKiosk.bind(this);
		this.kioskDelete = this.kioskDelete.bind(this);
		this.itemSubmit = this.itemSubmit.bind(this);
		this.itemDelete = this.itemDelete.bind(this);
		this.newOrder = this.newOrder.bind(this);
		
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
		} else if (this.state.currentPage === 'item-edit') {
					fetch(`/kiosks/${this.state.currentId}/inventories/${this.state.itemId}`, {
						method: 'GET',
						headers: {
						token: Auth.getToken(),
						'Authorization': `Token ${Auth.getToken()}`,
						}
					}).then(res => res.json())	
						.then(res => {
							this.setState({
								oneItem: res,
								dataLoaded: true,
							})
						}).catch(err => console.log(err));
		} else if (this.state.currentPage === 'new' || this.state.currentPage === 'new-item') {
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
					redirectPath: '/profile',
				})
			}).catch(err => console.log(err));
	}
	
	newOrder(e) {
		e.preventDefault();
		fetch('/orders', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				token: Auth.getToken(),
				'Authorization': `Token ${Auth.getToken()}`,
			},
			body: JSON.stringify({
				total: 0,
			}),
		}).then(res => res.json())
			.then(res => {
				console.log(res);
				this.setState({
					fireRedirect: true,
					redirectPath: '/order',
				})
			}).catch(err => console.log(err));
	}
	
	itemSubmit(method, e, data, id) {
		e.preventDefault();
		fetch(`/kiosks/${this.state.currentId}/inventories/${id || ''}`, {
			method: method,
			headers: {
				'Content-Type': 'application/json',
				token: Auth.getToken(),
				'Authorization': `Token ${Auth.getToken()}`,
			},
			body: JSON.stringify({
				item: data,
			}),
		}).then(res => res.json())
			.then(res => {
				console.log(res);
				this.setState({
					fireRedirect: true,
					redirectPath: `/kisoks/${this.state.currentId}`,
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
					currentPage: 'order',
				});
			}).catch(err => console.log(err));
	}
	
	itemDelete(id) {
		fetch(`/kiosks/${this.state.currentId}/inventories/${id}`, {
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
					redirectPath: `/kisoks/${this.state.currentId}`,
				});
			}).catch(err => console.log(err));
	}
	
	decideWhichToRender() {
		switch (this.state.currentPage) {
			case 'profile':
				return <Dashboard myKiosks={this.state.myKiosks} kioskDelete={this.kioskDelete}/>;
				break;
			case 'kiosk':
				return <Kiosk oneKiosk={this.state.oneKiosk} itemDelete={this.itemDelete}
							newOrder={this.newOrder}/>;
				break;
			case 'new':
				return <KioskForm isAdd={true} newKiosk={this.newKiosk} />;
				break;
			case 'edit':
				return <KioskForm isAdd={false} newKiosk={this.newKiosk} oneKiosk={this.state.oneKiosk} />;
				break;
			case 'new-item':
				return <ItemForm isAdd={true} itemSubmit={this.itemSubmit} />;
				break;
			case 'item-edit':
				return <ItemForm isAdd={false} itemSubmit={this.itemSubmit} oneItem={this.state.oneItem} />;
				break;
			case 'order':
				return <Order oneKiosk={this.state.oneKiosk} />;
				break;
			default:
				return<Redirect push to='/profile' />;
				break;
		}
	}
	
	render() {
		console.log(this.props)
		return (
			<div className="container">
				{(this.state.dataLoaded) ? this.decideWhichToRender() : <p>Loading...</p>}
				{this.state.fireRedirect && <Redirect push to={this.state.redirectPath} />}
			</div>
		)
	}
}

export default Controller;