import React, { Component } from 'react';

class RegisterForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			fname: '',
			lname: '',
			username: '',
			password: '',
		}
		
		this.handleInputChange = this.handleInputChange.bind(this);
	}
	
	handleInputChange(e) {
	const name = e.target.name;
	const value = e.target.value;
	console.log(this.state);
	this.setState({
			[name]: value,
		});
	}
	
	render() {
		return(
			<div className="form">
				<form onSubmit={(e) => this.props.handleRegisterSubmit(e, this.state)}>
					<input type="text" name="fname" placeholder="First Name"
					value={this.state.fname} onChange={this.handleInputChange} />
					<input type="text" name="lname" placeholder="Last Name"
					value={this.state.lname} onChange={this.handleInputChange} />
					<input type="text" name="username" placeholder="Username"
					value={this.state.username} onChange={this.handleInputChange} />
					<input type="password" name="password" placeholder="Password"
					value={this.state.password} onChange={this.handleInputChange} />
					<input type="submit" value="Register"/>
				</form>
			</div>
		)
	}
}

export default RegisterForm;