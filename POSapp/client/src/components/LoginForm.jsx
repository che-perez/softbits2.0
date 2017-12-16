import React, { Component } from 'react';

class LoginForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			username: '',
			password: '',
		};
		
		this.handleInputChange = this.handleInputChange.bind(this);
	}
	
	handleInputChange(e) {
		const name = e.target.name;
		const value = e.target.value;
		this.setState({
			[name]: value,
		});
	}
	
	render() {
		return (
			<div className="form">
				<form onSubmit={(e) => this.props.handleLoginSubmit(e, this.state)}>
					<input type="text" name="username" placeholder="Username" value={this.state.username} onChange={this.handleInputChange}/>
					<input type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handleInputChange}/>
					<input type="submit" value="Login!" />
				</form>
			</div>
		)
	}
}

export default LoginForm;