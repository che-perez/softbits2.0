import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Auth from '../modules/Auth';



class Nav extends Component {
	constructor() {
		super();
		this.state = {
			auth: Auth.isUserAuthenticated(),
			
		};
		
	this.handleLogout = this.handleLogout.bind(this);
		
	}
	
	
handleLogout() {
	fetch('logout', {
		method: 'DELETE',
		headers: {
			token: Auth.getToken(),
			'Authorization': `Token ${Auth.getToken()}`,
		}
	}).then(res => {
		Auth.deauthenticateUser();
		this.setState({
			auth: Auth.isUserAuthenticated(),
		})
	}).catch(err => console.log(err));
}
	
	render() {
		return (
			<nav className="nav">
			<Link className="logo" to="/">softBits</Link>
			{this.state.auth ?
				<div className="mini">
				<Link className="links" to="/profile">Profile</Link>
				<span className="links" onClick={this.handleLogout}>Logout</span>
				</div>
				
			:	
				<div className="mini">
				<Link className="links" to="/login">Log In</Link>
				<Link className="links" to="/register">Register</Link>
				</div>
			}
			</nav>
		)
	}
}

export default Nav;