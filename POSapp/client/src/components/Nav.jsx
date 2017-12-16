import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Nav extends Component {
	render() {
		return (
			<nav className="nav">
				<Link to="/login">Log In</Link>
				<Link to="/register">Register</Link>
				<Link to="/dash">Profile</Link>
			</nav>
		)
	}
}

export default Nav;