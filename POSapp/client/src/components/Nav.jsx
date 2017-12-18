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
				<Link to="/login">Log In</Link>
				<Link to="/register">Register</Link>
				<Link to="/profile">Profile</Link>
				<span onClick={this.handleLogout}>Logout</span>
			</nav>
		)
	}
}

export default Nav;