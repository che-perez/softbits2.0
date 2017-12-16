import React, { Component } from 'react';
import Auth from '../modules/Auth';

class NewKioskForm extends Component {
	constructor() {
		super();
		this.state = {
			kiosk_name: '',
			location: '',
			address: '',
		}
		
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
				<form onSubmit={(e) => this.props.newKiosk(e, this.state)}>
					<input type="text" name="kiosk_name" placeholder="Kiosk Name" value={this.state.kiosk_name} onChange={this.handleInputChange} />
					<input type="text" name="location" placeholder="Location" value={this.state.location} onChange={this.handleInputChange} />
					<input type="text" name="address" placeholder="Address" value={this.state.address} onChange={this.handleInputChange} />
					<input type="submit" value="Add Kiosk" />
				</form>
			</div>
		)
	}
}

export default NewKioskForm;